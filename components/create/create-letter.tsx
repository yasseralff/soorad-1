'use client'

import { useMemo, useState, useTransition } from 'react'
import Link from 'next/link'
import { Dice5, ExternalLink, Music2, QrCode, Sparkles, Wand2 } from 'lucide-react'
import { CopyField } from '@/components/copy-field'
import { SealMark } from '@/components/seal-mark'
import { QrModal } from '@/components/letter/qr-button'
import { createLetterAction } from '@/server/actions/letters'
import { cn } from '@/lib/utils'

type Result = {
  code: string
  editToken: string
}

const MAX_BODY = 4000

export function CreateLetter() {
  const [sender, setSender] = useState('')
  const [receiver, setReceiver] = useState('')
  const [body, setBody] = useState('')
  const [songUrl, setSongUrl] = useState('')
  const [codeMode, setCodeMode] = useState<'random' | 'custom'>('random')
  const [customCode, setCustomCode] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<Result | null>(null)
  const [isPending, startTransition] = useTransition()

  const origin = typeof window !== 'undefined' ? window.location.origin : ''

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    startTransition(async () => {
      const res = await createLetterAction({
        sender,
        receiver,
        body,
        customCode: codeMode === 'custom' ? customCode : undefined,
        songUrl: songUrl || undefined,
      })

      if (!res.success) {
        setError(res.error)
        return
      }

      setResult({ code: res.code, editToken: res.editToken })
    })
  }

  if (result) {
    return <CreatedView result={result} origin={origin} />
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="From" htmlFor="sender">
          <input
            id="sender"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
            placeholder="Your name"
            maxLength={80}
            className="input"
          />
        </Field>
        <Field label="To" htmlFor="receiver">
          <input
            id="receiver"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
            placeholder="Their name"
            maxLength={80}
            className="input"
          />
        </Field>
      </div>

      <Field label="Your letter" htmlFor="body">
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value.slice(0, MAX_BODY))}
          placeholder="Dear friend, there is something I have been meaning to tell you…"
          rows={9}
          className="input resize-y font-hand text-xl leading-relaxed"
        />
        <span className="self-end text-xs text-muted-foreground">
          {body.length}/{MAX_BODY}
        </span>
      </Field>

      <Field label="Background song (optional)" htmlFor="song-url">
        <div className="flex flex-col gap-2">
          <div className="relative">
            <Music2 className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              id="song-url"
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

      <Field label="Reader code">
        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            <ModeButton
              active={codeMode === 'random'}
              onClick={() => setCodeMode('random')}
              icon={<Dice5 className="size-4" />}
              label="Generate random"
            />
            <ModeButton
              active={codeMode === 'custom'}
              onClick={() => setCodeMode('custom')}
              icon={<Wand2 className="size-4" />}
              label="Choose my own"
            />
          </div>
          {codeMode === 'custom' ? (
            <input
              value={customCode}
              onChange={(e) => setCustomCode(e.target.value.toUpperCase())}
              placeholder="E.g. SARAH1"
              maxLength={12}
              className="input font-mono uppercase tracking-widest"
            />
          ) : (
            <p className="text-sm text-muted-foreground">
              A unique 6-character code will be created for you.
            </p>
          )}
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

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex items-center cursor-pointer justify-center gap-2 font-medium self-start rounded-full bg-primary px-8 py-4 font-serif text-lg text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60"
      >
        {isPending ? 'Sealing…' : 'Seal the letter'}
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

function CreatedView({ result, origin }: { result: Result; origin: string }) {
  const [qrOpen, setQrOpen] = useState(false)

  const readerLink = useMemo(
    () => `${origin}/letter/${result.code}`,
    [origin, result.code],
  )
  const creatorLink = useMemo(
    () => `${origin}/edit/${result.editToken}`,
    [origin, result.editToken],
  )

  return (
    <div className="flex flex-col items-center gap-8 text-center">
      <SealMark className="size-16" />
      <div className="flex flex-col gap-2">
        <h2 className="font-serif text-3xl font-medium text-foreground">
          Your letter has been sealed.
        </h2>
        <p className="text-muted-foreground">
          Share the reader link or code. Keep the creator link private.
        </p>
      </div>

      <div className="flex w-full flex-col gap-6 text-left">
        <CopyField
          label="Reader link"
          value={readerLink}
          hint="Send this to the person you wrote to."
        />
        <CopyField
          label="Reader code"
          value={result.code}
          mono
          hint="They can also enter this code from the home page."
        />
        <div className="rounded-2xl border border-accent/30 bg-accent/5 p-4">
          <CopyField
            label="Creator link — keep this safe"
            value={creatorLink}
            mono
            hint="Anyone with this link can edit the letter. Do not share it."
          />
        </div>
      </div>

      {/* QR code section */}
      <div className="flex w-full flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-secondary/30 px-6 py-5">
        <p className="font-serif text-sm uppercase tracking-[0.25em] text-muted-foreground">
          Share with QR
        </p>
        <p className="max-w-xs text-sm text-muted-foreground">
          Let them scan instead of typing the link.
        </p>
        <button
          type="button"
          onClick={() => setQrOpen(true)}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 font-serif text-sm text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <QrCode className="size-4" />
          Show QR code
        </button>
      </div>

      <QrModal
        url={readerLink}
        receiver={result.code}
        open={qrOpen}
        onClose={() => setQrOpen(false)}
      />

      <Link
        href={`/letter/${result.code}`}
        className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-serif text-lg text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Preview the letter
        <ExternalLink className="size-4" />
      </Link>
    </div>
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

function ModeButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        active
          ? 'border-primary bg-primary text-primary-foreground'
          : 'border-border text-muted-foreground hover:bg-secondary hover:text-foreground',
      )}
    >
      {icon}
      {label}
    </button>
  )
}
