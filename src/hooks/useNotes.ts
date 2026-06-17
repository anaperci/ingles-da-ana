import { useCallback, useEffect, useState } from 'react'
import { loadJSON, saveJSON } from '@/lib/storage'
import {
  listNotes,
  createNote,
  updateNote,
  deleteNote,
  type Note,
  type NoteInput,
} from '@/lib/notes'

const CACHE = 'notes:cache'

/**
 * Notas com cache local + UI otimista. Mostra na hora o que está em cache (e as
 * mudanças aplicam-se localmente na hora), sincronizando com o servidor em
 * segundo plano. Esconde a latência edge→banco do Supabase. Em caso de erro,
 * re-sincroniza pra voltar à verdade do servidor.
 */
export function useNotes() {
  const [notes, setNotes] = useState<Note[]>(() => loadJSON<Note[]>(CACHE, []))
  const [loading, setLoading] = useState(notes.length === 0)
  const [error, setError] = useState<string | null>(null)

  const persist = (updater: (prev: Note[]) => Note[]) =>
    setNotes((prev) => {
      const next = updater(prev)
      saveJSON(CACHE, next)
      return next
    })

  const sync = useCallback(async () => {
    try {
      const fresh = await listNotes()
      setNotes(fresh)
      saveJSON(CACHE, fresh)
      setError(null)
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    sync()
  }, [sync])

  const create = useCallback(
    async (input: NoteInput) => {
      const now = new Date().toISOString()
      const tempId = `temp-${Date.now()}`
      const temp: Note = { id: tempId, ...input, created_at: now, updated_at: now }
      persist((prev) => [temp, ...prev]) // otimista
      try {
        const real = await createNote(input)
        persist((prev) => prev.map((n) => (n.id === tempId ? real : n)))
      } catch (e) {
        persist((prev) => prev.filter((n) => n.id !== tempId)) // desfaz
        throw e
      }
    },
    []
  )

  const update = useCallback(
    async (id: string, input: NoteInput) => {
      const now = new Date().toISOString()
      persist((prev) =>
        prev.map((n) => (n.id === id ? { ...n, ...input, updated_at: now } : n))
      )
      try {
        await updateNote(id, input)
      } catch (e) {
        sync() // reverte pra verdade do servidor
        throw e
      }
    },
    [sync]
  )

  const remove = useCallback(
    async (id: string) => {
      persist((prev) => prev.filter((n) => n.id !== id)) // otimista
      try {
        await deleteNote(id)
      } catch (e) {
        sync()
        throw e
      }
    },
    [sync]
  )

  return { notes, loading, error, create, update, remove, sync }
}
