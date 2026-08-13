'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Music2, Sparkles } from 'lucide-react'
import { updateLetterAction } from '@/server/actions/letters'
import { cn } from '@/lib/utils'
import type { Letter } from '@/lib/letters'

const MAX_BODY = 4000

export function EditLetter({
  letter,
  editToken,
}: {
  letter: Letter | null
  editToken: string
}) {
  const router = useRouter()
  const [sender, setSender] = useState(letter?.sender ?? '')
  const [receiver, setReceiver] = useState(letter?.receiver ?? '')
  const [body, setBody] = useState(letter?.body ?? '')
  const [songUrl, setSongUrl] = useState(letter?.songUrl ?? '')
  const [error, setError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)
  const [isPending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSaved(false)

    startTransition(async () => {
      const res = await updateLetterAction({
        editToken,
        sender,
        receiver,
        body,
        songUrl,
      })

      if (!res.success) {
        setError(res.error)
        return
      }

      setSaved(true)
      if (letter?.code) {
        router.push(`/letter/${letter.code}`)
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="From" htmlFor="edit-sender">
          <input
            id="edit-sender"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
            placeholder="Your name"
            maxLength={80}
            className="input"
          />
        </Field>
        <Field label="To" htmlFor="edit-receiver">
          <input
            id="edit-receiver"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
            placeholder="Their name"
            maxLength={80}
            className="input"
          />
        </Field>
      </div>

      <Field label="Your letter" htmlFor="edit-body">
        <textarea
          id="edit-body"
          value={body}
          onChange={(e) => setBody(e.target.value.slice(0, MAX_BODY))}
          rows={9}
          className="input resize-y font-hand text-xl leading-relaxed"
        />
        <span className="mt-1 self-end text-xs text-muted-foreground">
          {body.length}/{MAX_BODY}
        </span>
      </Field>

      <Field label="Background song (optional)" htmlFor="edit-song-url">
        <div className="flex flex-col gap-2">
          <div className="relative">
            <Music2 className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              id="edit-song-url"
              type="url"
              value={songUrl}
              onChange={(e) => setSongUrl(e.target.value)}
              placeholder="https://open.spotify.com/track/..."
              className="input pl-9"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Paste a Spotify track link. A 30-second preview will play when the letter opens.
          </p>
        </div>
      </Field>

      {/* <Field label="Theme">
        <div className="flex items-center gap-2 rounded-xl border border-dashed border-border bg-secondary/40 px-4 py-3 text-sm text-muted-foreground">
          <Sparkles className="size-4 text-accent" />
          Paper and ink styles are coming soon.
        </div>
      </Field> */}

      {error ? (
        <p className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      ) : null}

      {saved ? (
        <p className="rounded-xl border border-green-500/40 bg-green-500/10 px-4 py-3 text-sm text-green-700 dark:text-green-400">
          Letter updated successfully!
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex items-center justify-center gap-2 self-start rounded-full bg-primary px-8 py-4 font-serif text-lg text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60"
      >
        {isPending ? 'Saving…' : 'Save changes'}
      </button>

      <style jsx>{`
        :global(.input) {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid var(--border);
          background-color: color-mix(in oklab, var(--secondary) 45%, transparent);
          padding: 0.75rem 1rem;
          color: var(--foreground);
          outline: none;
        }
        :global(.input::placeholder) {
          color: var(--muted-foreground);
        }
        :global(.input:focus-visible) {
          border-color: var(--ring);
          box-shadow: 0 0 0 2px color-mix(in oklab, var(--ring) 40%, transparent);
        }
      `}</style>
    </form>
  )
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string
  htmlFor?: string
  children: React.ReactNode
}) {
  return (
    <label htmlFor={htmlFor} className="flex flex-col gap-2">
      <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  )
}
