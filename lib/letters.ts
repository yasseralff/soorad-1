export type Letter = {
  id: string
  sender: string
  receiver: string
  body: string
  code: string
  editToken: string
  views: number
  createdAt: string
  songUrl?: string
}

// In-memory mock data for the design pass. This will be replaced by a
// Supabase-backed store when persistence is wired up.
export const MOCK_LETTERS: Record<string, Letter> = {
  AB12CD: {
    id: '1',
    sender: 'Yasser',
    receiver: 'Sarah',
    body: `There are a hundred things I keep meaning to say out loud, and somehow they always dissolve before they reach the air.

So I am writing them down instead.

Thank you for the quiet mornings, for laughing at the jokes that weren't funny, and for staying when it would have been easier to go.

You have made ordinary days feel like something worth remembering.`,
    code: 'AB12CD',
    editToken: 'fe6fc0ab6fb72b3f9c1d4e7a8b2c5d6e',
    views: 3,
    createdAt: '2026-01-14T09:00:00.000Z',
  },
  HELLO7: {
    id: '2',
    sender: 'A friend',
    receiver: 'You',
    body: `I heard this week has been heavy.

I don't have the right words, and maybe there aren't any. But I wanted you to know that someone, somewhere, is thinking of you and hoping the weight lifts soon.

Be gentle with yourself. You are doing better than you think.`,
    code: 'HELLO7',
    editToken: 'a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6',
    views: 12,
    createdAt: '2026-01-20T14:30:00.000Z',
  },
}

export function getLetter(code: string): Letter | null {
  return MOCK_LETTERS[code.toUpperCase()] ?? null
}

const CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

export function generateCode(length = 6): string {
  let out = ''
  for (let i = 0; i < length; i++) {
    out += CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)]
  }
  return out
}

export function generateEditToken(): string {
  const bytes = new Uint8Array(16)
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(bytes)
  } else {
    for (let i = 0; i < bytes.length; i++) bytes[i] = Math.floor(Math.random() * 256)
  }
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}
