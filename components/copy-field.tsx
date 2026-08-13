'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { cn } from '@/lib/utils'

export function CopyField({
  label,
  value,
  hint,
  mono,
}: {
  label: string
  value: string
  hint?: string
  mono?: boolean
}) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // Clipboard may be unavailable; fail quietly.
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
      <div className="flex items-stretch gap-2">
        <div
          className={cn(
            'flex-1 truncate rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground',
            mono && 'font-mono tracking-tight',
          )}
          title={value}
        >
          {value}
        </div>
        <button
          type="button"
          onClick={copy}
          aria-label={`Copy ${label}`}
          className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-border px-4 text-sm text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {copied ? (
            <Check className="size-4 text-accent" />
          ) : (
            <Copy className="size-4" />
          )}
          <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  )
}
