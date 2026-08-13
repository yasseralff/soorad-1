'use server'

import { z } from 'zod'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { generateCode, generateEditToken } from '@/lib/letters'

const CreateLetterSchema = z.object({
  sender: z.string().min(1, 'Sender name is required').max(80),
  receiver: z.string().min(1, 'Receiver name is required').max(80),
  body: z.string().min(1, 'Letter body is required').max(4000),
  customCode: z.string().optional(),
  songUrl: z
    .string()
    .url()
    .regex(/open\.spotify\.com\/track\//, 'Must be a Spotify track URL')
    .optional()
    .or(z.literal('')),
})

export type CreateLetterInput = z.infer<typeof CreateLetterSchema>

export type CreateLetterResult =
  | { success: true; code: string; editToken: string }
  | { success: false; error: string }

export async function createLetterAction(
  raw: CreateLetterInput,
): Promise<CreateLetterResult> {
  const parsed = CreateLetterSchema.safeParse(raw)
  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0]?.message ?? 'Invalid input.' }
  }

  const { sender, receiver, body, customCode, songUrl } = parsed.data

  let code: string
  if (customCode && customCode.trim()) {
    const cleaned = customCode.trim().toUpperCase()
    if (!/^[A-Z0-9]{4,12}$/.test(cleaned)) {
      return { success: false, error: 'Custom codes must be 4–12 letters or numbers.' }
    }
    code = cleaned
  } else {
    code = generateCode()
  }

  const editToken = generateEditToken()

  const supabase = await createSupabaseServerClient()

  const { error } = await supabase.from('letters').insert({
    sender,
    receiver,
    body,
    code,
    edit_token: editToken,
    song_url: songUrl || null,
    views: 0,
  })

  if (error) {
    if (error.code === '23505') {
      return {
        success: false,
        error: 'That code is already taken. Please choose a different one.',
      }
    }
    console.error('[createLetterAction]', error)
    return { success: false, error: 'Something went wrong. Please try again.' }
  }

  return { success: true, code, editToken }
}

export type UpdateLetterInput = {
  editToken: string
  sender: string
  receiver: string
  body: string
  songUrl?: string
}

export type UpdateLetterResult =
  | { success: true }
  | { success: false; error: string }

export async function updateLetterAction(
  raw: UpdateLetterInput,
): Promise<UpdateLetterResult> {
  const { editToken, sender, receiver, body, songUrl } = raw

  if (!sender.trim() || !receiver.trim() || !body.trim()) {
    return { success: false, error: 'Please fill in all required fields.' }
  }

  const supabase = await createSupabaseServerClient()

  const { error } = await supabase
    .from('letters')
    .update({
      sender: sender.trim(),
      receiver: receiver.trim(),
      body: body.trim(),
      song_url: songUrl || null,
    })
    .eq('edit_token', editToken)

  if (error) {
    console.error('[updateLetterAction]', error)
    return { success: false, error: 'Failed to update the letter. Please try again.' }
  }

  return { success: true }
}
