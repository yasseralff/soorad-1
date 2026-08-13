'use client'

import { useState } from 'react'
import Link from 'next/link'
import { toPng } from 'html-to-image'
import { ArrowLeft, Check, Download, Share2 } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { QrButton } from '@/components/letter/qr-button'
import { cn } from '@/lib/utils'

export function LetterToolbar({
  targetRef,
  receiver,
}: {
  targetRef: React.RefObject<HTMLDivElement | null>
  receiver: string
}) {
  const [shared, setShared] = useState(false)
  const [downloading, setDownloading] = useState(false)

  const url = typeof window !== 'undefined' ? window.location.href : ''

  async function share() {
    const data = { title: 'A letter for you', text: 'Someone wrote you a letter.', url }
    try {
      if (navigator.share) {
        await navigator.share(data)
        return
      }
      await navigator.clipboard.writeText(url)
      setShared(true)
      setTimeout(() => setShared(false), 1800)
    } catch {
      // User dismissed the share sheet, or clipboard was blocked.
    }
  }

  async function download() {
    if (!targetRef.current) return
    setDownloading(true)
    try {
      const bg = getComputedStyle(document.body).backgroundColor
      const dataUrl = await toPng(targetRef.current, {
        pixelRatio: 2,
        backgroundColor: bg,
        cacheBust: true,
      })
      const link = document.createElement('a')
      link.download = `letter-for-${receiver.toLowerCase().replace(/\s+/g, '-')}.png`
      link.href = dataUrl
      link.click()
    } catch {
      // Ignore export failures silently in this design pass.
    } finally {
      setDownloading(false)
    }
  }

  const btn =
    'inline-flex size-10 cursor-pointer items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'

  return (
    <div className="flex items-center gap-2 rounded-full border border-border bg-card/80 p-1.5 shadow-lg backdrop-blur">
      <Link href="/" aria-label="Back to home" className={btn}>
        <ArrowLeft className="size-[18px]" />
      </Link>
      <button type="button" onClick={share} aria-label="Share letter" className={btn}>
        {shared ? <Check className="size-[18px] text-accent" /> : <Share2 className="size-[18px]" />}
      </button>
      <button
        type="button"
        onClick={download}
        disabled={downloading}
        aria-label="Download as image"
        className={cn(btn, downloading && 'opacity-60')}
      >
        <Download className="size-[18px]" />
      </button>
      <ThemeToggle />
    </div>
  )
}
