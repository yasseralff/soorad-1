import { CodeEntry } from '@/components/code-entry'
import { SealMark } from '@/components/seal-mark'
import { TopBar } from '@/components/top-bar'
import Link from 'next/link'

export default function CodePage() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col px-6 py-6">
      <TopBar showLogo={false} backLabel="Home" />
      <div className="flex flex-1 flex-col items-center justify-center gap-10 pb-16 text-center">
        <Link
          href="/"
          aria-label="Go to home"
          className="inline-flex items-center justify-center rounded-full transition-transform hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <SealMark className="size-16 shadow-sm" />
        </Link>
        <div className="flex flex-col gap-3">
          <h1 className="font-serif text-4xl font-medium text-foreground sm:text-5xl">
            Enter your code
          </h1>
          <p className="font-hand text-2xl text-muted-foreground">
            A letter is waiting to be opened.
          </p>
        </div>
        <CodeEntry />
      </div>
    </main>
  )
}
