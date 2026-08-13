import { CreateLetter } from '@/components/create/create-letter'
import { TopBar } from '@/components/top-bar'

export default function CreatePage() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col gap-10 px-6 py-6">
      <TopBar backLabel="Home" />
      <div className="flex flex-col gap-10 pb-16">
        <div className="flex flex-col gap-3">
          <h1 className="text-balance font-serif text-4xl font-medium text-foreground sm:text-5xl">
            Write your letter
          </h1>
          <p className="font-hand text-2xl text-muted-foreground">
            Take your time. The right words are worth the wait.
          </p>
        </div>
        <CreateLetter />
      </div>
    </main>
  )
}
