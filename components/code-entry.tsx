'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { getLetter } from '@/lib/letters'
import { cn } from '@/lib/utils'

const LEN = 6

export function CodeEntry() {
  const router = useRouter()
  const [chars, setChars] = useState<string[]>(Array(LEN).fill(''))
  const [error, setError] = useState<string | null>(null)
  const inputs = useRef<(HTMLInputElement | null)[]>([])

  function setChar(i: number, value: string) {
    const v = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase()
    setError(null)
    setChars((prev) => {
      const next = [...prev]
      if (v.length > 1) {
        // Handle paste across boxes.
        for (let k = 0; k < v.length && i + k < LEN; k++) next[i + k] = v[k]
      } else {
        next[i] = v
      }
      return next
    })
    if (v && i < LEN - 1) inputs.current[Math.min(i + v.length, LEN - 1)]?.focus()
  }

  function onKeyDown(i: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && !chars[i] && i > 0) {
      inputs.current[i - 1]?.focus()
    }
  }

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const code = chars.join('')
    if (code.length < LEN) {
      setError('Please enter all six characters.')
      return
    }
    if (!getLetter(code)) {
      setError("We couldn't find a letter with that code.")
      return
    }
    router.push(`/letter/${code}`)
  }

  return (
    <form onSubmit={submit} className="flex flex-col items-center gap-6">
      <div className="flex gap-2 sm:gap-3" role="group" aria-label="Letter code">
        {chars.map((c, i) => (
          <input
            key={i}
            ref={(el) => {
              inputs.current[i] = el
            }}
            value={c}
            onChange={(e) => setChar(i, e.target.value)}
            onKeyDown={(e) => onKeyDown(i, e)}
            inputMode="text"
            autoCapitalize="characters"
            maxLength={LEN}
            aria-label={`Character ${i + 1}`}
            className={cn(
              'size-12 rounded-xl border border-border bg-card text-center font-mono text-2xl uppercase text-foreground shadow-sm outline-none transition-colors sm:size-14',
              'focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring',
            )}
          />
        ))}
      </div>

      {error ? (
        <p className="text-sm text-destructive">{error}</p>
      ) : null}

      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-serif text-lg text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        Open Letter
        <ArrowRight className="size-5" />
      </button>
    </form>
  )
}
