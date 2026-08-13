import { CreateLetter } from '@/components/create/create-letter'
import { TopBar } from '@/components/top-bar'

export default function CreatePage() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col px-6 py-6">
      <TopBar backLabel="Home" />
      <div className="mt-10 mb-16">
        <div className="mb-10">
          <h1 className="text-balance font-serif text-4xl font-medium text-foreground sm:text-5xl">
            Write your letter
          </h1>
          <p className="mt-3 font-hand text-2xl text-muted-foreground">
            Take your time. The right words are worth the wait.
          </p>
        </div>
        <CreateLetter />
      </div>
    </main>
  )
}
