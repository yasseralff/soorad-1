import Link from 'next/link'
import { MailQuestion } from 'lucide-react'

export default function LetterNotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 px-6 text-center">
      <span className="inline-flex size-16 items-center justify-center rounded-full bg-secondary text-muted-foreground">
        <MailQuestion className="size-7" />
      </span>
      <div className="flex flex-col gap-3">
        <h1 className="font-serif text-4xl font-medium text-foreground">
          This letter can&apos;t be found
        </h1>
        <p className="font-hand text-2xl text-muted-foreground">
          The code may be wrong, or the letter may have been removed.
        </p>
      </div>
      <div className="flex gap-3">
        <Link
          href="/code"
          className="rounded-full bg-primary px-6 py-3 font-serif text-lg text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Try another code
        </Link>
        <Link
          href="/"
          className="rounded-full border border-border px-6 py-3 font-serif text-lg text-foreground transition-colors hover:bg-secondary"
        >
          Go home
        </Link>
      </div>
    </main>
  )
}
