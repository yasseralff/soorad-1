import { createSupabaseServerClient } from '@/lib/supabase/server'
import type { Letter } from '@/lib/letters'

export async function getLetterByCode(code: string): Promise<Letter | null> {
  const supabase = await createSupabaseServerClient()

  const { data, error } = await supabase
    .from('letters')
    .select('*')
    .eq('code', code.toUpperCase())
    .single()

  if (error || !data) return null

  return {
    id: data.id,
    sender: data.sender,
    receiver: data.receiver,
    body: data.body,
    code: data.code,
    editToken: data.edit_token,
    views: data.views,
    createdAt: data.created_at,
    songUrl: data.song_url ?? undefined,
  }
}

export async function getLetterByEditToken(token: string): Promise<Letter | null> {
  const supabase = await createSupabaseServerClient()

  const { data, error } = await supabase
    .from('letters')
    .select('*')
    .eq('edit_token', token)
    .single()

  if (error || !data) return null

  return {
    id: data.id,
    sender: data.sender,
    receiver: data.receiver,
    body: data.body,
    code: data.code,
    editToken: data.edit_token,
    views: data.views,
    createdAt: data.created_at,
    songUrl: data.song_url ?? undefined,
  }
}

export async function incrementLetterViews(code: string): Promise<void> {
  const supabase = await createSupabaseServerClient()
  await supabase.rpc('increment_letter_views', { letter_code: code })
}
