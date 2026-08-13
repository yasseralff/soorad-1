import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { SealMark } from '@/components/seal-mark'

export function TopBar({
  backHref = '/',
  backLabel = 'Back',
}: {
  backHref?: string
  backLabel?: string
}) {
  return (
    <header className="grid w-full grid-cols-3 items-center">
      <div className="justify-self-start">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ArrowLeft className="size-4" />
          {backLabel}
        </Link>
      </div>
      
      <div className="justify-self-center">
        <Link
          href="/"
          aria-label="Go to home"
          className="inline-flex items-center justify-center rounded-full transition-transform hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <SealMark className="size-9 shadow-sm" />
        </Link>
      </div>

      <div className="justify-self-end">
        <ThemeToggle />
      </div>
    </header>
  )
}
