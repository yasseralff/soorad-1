import { CodeEntry } from '@/components/code-entry'
import { SealMark } from '@/components/seal-mark'
import { TopBar } from '@/components/top-bar'

export default function CodePage() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col px-6 py-6">
      <TopBar backLabel="Home" />
      <div className="flex flex-1 flex-col items-center justify-center gap-10 pb-16 text-center">
        <SealMark className="size-16" />
        <div>
          <h1 className="font-serif text-4xl font-medium text-foreground sm:text-5xl">
            Enter your code
          </h1>
          <p className="mt-3 font-hand text-2xl text-muted-foreground">
            A letter is waiting to be opened.
          </p>
        </div>
        <CodeEntry />
      </div>
    </main>
  )
}
