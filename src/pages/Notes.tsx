import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  NotebookPen,
  Plus,
  Search,
  Pencil,
  Trash2,
  Tag as TagIcon,
  Check,
  Loader2,
  X,
} from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { MarkdownEditor } from '@/components/notes/MarkdownEditor'
import { Markdown } from '@/components/notes/Markdown'
import { loadJSON, saveJSON, removeKey } from '@/lib/storage'
import {
  listNotes,
  createNote,
  updateNote,
  deleteNote,
  type Note,
  type NoteInput,
} from '@/lib/notes'

const DRAFT_KEY = 'notes:draft'

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return ''
  }
}

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Note | null>(null)
  const [confirm, setConfirm] = useState<Note | null>(null)
  const [deleting, setDeleting] = useState(false)

  const refresh = useCallback(async () => {
    setError(null)
    try {
      setNotes(await listNotes())
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return notes
    return notes.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.content.toLowerCase().includes(q) ||
        (n.tag ?? '').toLowerCase().includes(q)
    )
  }, [notes, query])

  function openNew() {
    setEditing(null)
    setModalOpen(true)
  }

  function openEdit(n: Note) {
    setEditing(n)
    setModalOpen(true)
  }

  async function handleDelete() {
    if (!confirm) return
    setDeleting(true)
    try {
      await deleteNote(confirm.id)
      setNotes((prev) => prev.filter((n) => n.id !== confirm.id))
      setConfirm(null)
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div>
      <PageHeader
        icon={NotebookPen}
        title="My Notes"
        subtitle="Anote o que aprender — phrasal verbs, gramática, vocabulário"
        actions={
          <Button onClick={openNew} className="gap-2">
            <Plus className="h-4 w-4" /> New Note
          </Button>
        }
      />

      {/* Busca */}
      <div className="relative mb-6">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar nas notas…"
          className="pl-10"
        />
      </div>

      {error && (
        <p className="mb-4 rounded-lg border border-error/30 bg-error/5 p-3 text-sm text-error">
          {error}
        </p>
      )}

      {loading ? (
        <div className="flex items-center justify-center gap-2 py-20 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" /> Carregando…
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState searching={query.trim().length > 0} onNew={openNew} />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {filtered.map((n) => (
            <NoteCard
              key={n.id}
              note={n}
              onEdit={() => openEdit(n)}
              onDelete={() => setConfirm(n)}
            />
          ))}
        </div>
      )}

      <NoteModal
        open={modalOpen}
        note={editing}
        onClose={() => setModalOpen(false)}
        onSaved={refresh}
      />

      {/* Confirmação de exclusão */}
      <Dialog open={!!confirm} onOpenChange={(o) => !o && setConfirm(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Apagar nota?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            “{confirm?.title || 'Sem título'}” será apagada para sempre. Não dá pra desfazer.
          </p>
          <div className="mt-2 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setConfirm(null)} disabled={deleting}>
              Cancelar
            </Button>
            <Button
              onClick={handleDelete}
              disabled={deleting}
              className="gap-2 bg-error text-white hover:bg-error/90"
            >
              {deleting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
              Apagar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function EmptyState({ searching, onNew }: { searching: boolean; onNew: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-card-border bg-card py-16 text-center">
      <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-soft text-primary">
        <NotebookPen className="h-7 w-7" />
      </div>
      {searching ? (
        <p className="text-muted-foreground">Nenhuma nota encontrada.</p>
      ) : (
        <>
          <p className="font-semibold text-foreground">
            Start writing what you learned today
          </p>
          <p className="mt-1 max-w-xs text-sm text-muted-foreground">
            Guarde uma palavra nova, uma regra de gramática ou um phrasal verb que
            apareceu hoje.
          </p>
          <Button onClick={onNew} className="mt-4 gap-2">
            <Plus className="h-4 w-4" /> New Note
          </Button>
        </>
      )}
    </div>
  )
}

function NoteCard({
  note,
  onEdit,
  onDelete,
}: {
  note: Note
  onEdit: () => void
  onDelete: () => void
}) {
  return (
    <div className="group flex flex-col rounded-2xl border border-card-border bg-card p-5 shadow-soft transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg font-bold leading-snug text-primary">
          {note.title || 'Sem título'}
        </h3>
        <div className="flex shrink-0 gap-1 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
          <button
            onClick={onEdit}
            aria-label="Editar nota"
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-soft hover:text-primary"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={onDelete}
            aria-label="Apagar nota"
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-error/10 hover:text-error"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {note.content && (
        <Markdown className="mt-2 line-clamp-3 text-sm prose-p:text-muted-foreground prose-li:text-muted-foreground">
          {note.content}
        </Markdown>
      )}

      <div className="mt-4 flex items-center justify-between gap-2 pt-1">
        {note.tag ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-2.5 py-1 text-xs font-semibold text-accent-dark">
            <TagIcon className="h-3 w-3" /> {note.tag}
          </span>
        ) : (
          <span />
        )}
        <span className="font-mono text-xs text-muted-foreground">
          {formatDate(note.created_at)}
        </span>
      </div>
    </div>
  )
}

function NoteModal({
  open,
  note,
  onClose,
  onSaved,
}: {
  open: boolean
  note: Note | null
  onClose: () => void
  onSaved: () => void
}) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tag, setTag] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  // Ao abrir: preenche (edição) ou restaura o rascunho (nota nova).
  useEffect(() => {
    if (!open) return
    if (note) {
      setTitle(note.title)
      setContent(note.content)
      setTag(note.tag ?? '')
    } else {
      const d = loadJSON<NoteInput>(DRAFT_KEY, { title: '', content: '', tag: '' })
      setTitle(d.title ?? '')
      setContent(d.content ?? '')
      setTag(d.tag ?? '')
    }
    setErr(null)
    setSaved(false)
  }, [open, note])

  // Auto-save do rascunho enquanto digita (só para nota nova).
  useEffect(() => {
    if (!open || note) return
    saveJSON(DRAFT_KEY, { title, content, tag: tag || null })
  }, [open, note, title, content, tag])

  async function save() {
    if (!title.trim() && !content.trim()) {
      setErr('Escreva um título ou um conteúdo.')
      return
    }
    setSaving(true)
    setErr(null)
    try {
      const payload: NoteInput = {
        title: title.trim(),
        content: content.trim(),
        tag: tag.trim() || null,
      }
      if (note) {
        await updateNote(note.id, payload)
      } else {
        await createNote(payload)
        removeKey(DRAFT_KEY)
      }
      onSaved()
      setSaved(true)
      // "Saved!" por 2 segundos, depois fecha
      window.setTimeout(() => {
        setSaved(false)
        onClose()
      }, 2000)
    } catch (e) {
      setErr((e as Error).message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{note ? 'Editar nota' : 'Nova nota'}</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título"
            autoFocus
          />
          <MarkdownEditor
            value={content}
            onChange={setContent}
            placeholder="Escreva o que aprendeu…  (negrito, itálico, listas e markdown suportados)"
            rows={8}
          />
          {content.trim() && (
            <details className="rounded-lg border border-input bg-muted/30 px-3 py-2 text-sm">
              <summary className="cursor-pointer select-none font-medium text-muted-foreground">
                Pré-visualizar
              </summary>
              <div className="mt-2">
                <Markdown>{content}</Markdown>
              </div>
            </details>
          )}
          <div className="relative">
            <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              placeholder="Tag (ex: phrasal verb, grammar)"
              className="pl-10"
            />
          </div>

          {err && <p className="text-sm text-error">{err}</p>}

          <div className="flex items-center justify-end gap-2 pt-1">
            {saved && (
              <span className="mr-auto inline-flex items-center gap-1 text-sm font-semibold text-success">
                <Check className="h-4 w-4" /> Saved!
              </span>
            )}
            <Button variant="outline" onClick={onClose} disabled={saving}>
              <X className="h-4 w-4" /> Fechar
            </Button>
            <Button onClick={save} disabled={saving || saved} className="gap-2">
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Check className="h-4 w-4" />
              )}
              {note ? 'Salvar' : 'Criar nota'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
