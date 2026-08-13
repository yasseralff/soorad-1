import { notFound } from 'next/navigation'
import { LetterExperience } from '@/components/letter/letter-experience'
import { getLetterByCode } from '@/server/services/letter'
import { getLetter as getMockLetter } from '@/lib/letters'

export default async function LetterPage({
  params,
}: {
  params: Promise<{ code: string }>
}) {
  const { code } = await params

  // Use Supabase if credentials are configured, otherwise fall back to mock
  const hasSupabase =
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('your-project-id')

  const letter = hasSupabase
    ? await getLetterByCode(code)
    : getMockLetter(code)

  if (!letter) {
    notFound()
  }

  return (
    <main className="min-h-dvh">
      <LetterExperience letter={letter} />
    </main>
  )
}
