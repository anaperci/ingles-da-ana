/**
 * Cliente das notas — fala com a Edge Function `notes` (CRUD em ingles.notes).
 * Conta fixa "ana" (o app não tem auth; é pessoal).
 */
import { callFunction } from '@/lib/api'

export interface Note {
  id: string
  title: string
  content: string
  tag: string | null
  created_at: string
  updated_at: string
}

export interface NoteInput {
  title: string
  content: string
  tag: string | null
}

const ACCOUNT_ID = 'ana'

export async function listNotes(): Promise<Note[]> {
  const res = await callFunction<{ notes: Note[] }>('notes', {
    action: 'list',
    accountId: ACCOUNT_ID,
  })
  return res.notes ?? []
}

export async function createNote(note: NoteInput): Promise<Note> {
  const res = await callFunction<{ note: Note }>('notes', {
    action: 'create',
    accountId: ACCOUNT_ID,
    note,
  })
  return res.note
}

export async function updateNote(id: string, note: NoteInput): Promise<Note> {
  const res = await callFunction<{ note: Note }>('notes', {
    action: 'update',
    accountId: ACCOUNT_ID,
    id,
    note,
  })
  return res.note
}

export async function deleteNote(id: string): Promise<void> {
  await callFunction('notes', { action: 'delete', accountId: ACCOUNT_ID, id })
}
