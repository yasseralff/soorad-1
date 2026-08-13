import { notFound } from 'next/navigation'
import { TopBar } from '@/components/top-bar'
import { EditLetter } from '@/components/create/edit-letter'
import { getLetterByEditToken } from '@/server/services/letter'
import { getLetter as findMockByToken } from '@/lib/letters'

export default async function EditPage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = await params

  const hasSupabase =
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('your-project-id')

  // In mock mode we can only look up by code, not by token, so we show a fallback
  const letter = hasSupabase ? await getLetterByEditToken(token) : null

  if (!letter && hasSupabase) {
    notFound()
  }

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col px-6 py-6">
      <TopBar backLabel="Home" />
      <div className="mt-10 mb-16">
        <div className="mb-10">
          <h1 className="text-balance font-serif text-4xl font-medium text-foreground sm:text-5xl">
            Edit your letter
          </h1>
          <p className="mt-3 font-hand text-2xl text-muted-foreground">
            Make your changes. The link will stay the same.
          </p>
        </div>
        <EditLetter letter={letter} editToken={token} />
      </div>
    </main>
  )
}
