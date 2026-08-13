import Link from 'next/link'
import { ArrowRight, KeyRound } from 'lucide-react'
import { SealMark } from '@/components/seal-mark'
import { ThemeToggle } from '@/components/theme-toggle'

export default function HomePage() {
  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 py-16">
      <div className="absolute right-6 top-6">
        <ThemeToggle />
      </div>

      <div className="flex w-full max-w-xl flex-col items-center text-center">
        <SealMark className="size-16" />

        <p className="mt-10 font-serif text-sm uppercase tracking-[0.35em] text-muted-foreground">
          Soorad
        </p>

        <h1 className="mt-4 text-balance font-serif text-4xl font-medium leading-tight text-foreground sm:text-5xl md:text-6xl">
          Some words are easier written than spoken.
        </h1>

        <p className="mt-6 max-w-md text-pretty font-hand text-2xl leading-relaxed text-muted-foreground">
          Write a beautiful, handwritten letter and send it with a private code
          or link. No accounts. No noise. Just the words.
        </p>

        <div className="mt-12 flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/create"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 font-serif text-lg text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto"
          >
            Create a Letter
            <ArrowRight className="size-5 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <Link
            href="/code"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border px-8 py-4 font-serif text-lg text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-auto"
          >
            <KeyRound className="size-5" />
            Open a Letter
          </Link>
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          Already have a code? Enter it to reveal your letter.
        </p>
      </div>
    </main>
  )
}
