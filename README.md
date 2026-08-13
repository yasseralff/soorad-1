# README.md

# 💌 Soorad

> Create beautiful handwritten digital letters that can be shared through a unique code or link.

**Live Demo**: [soorad-1.vercel.app](https://soorad-1.vercel.app/)

Soorad is an anonymous web application that allows anyone to create and share beautifully designed handwritten-style digital letters. Rather than focusing on productivity or messaging, the project emphasizes emotion, storytelling, and a delightful reading experience.

Inspired by the experience of opening a physical envelope, every interaction is designed to feel calm, intentional, and memorable.

---

## Features

### Anonymous

No account required.

Anyone can create a letter instantly.

### Unique Reader Code

Every letter receives a unique 6–8 character code that can be shared.

Example:

```
AB12CD
```

### Reader Link

Every letter also has a shareable URL.

### Secret Creator Link

A secure edit link is generated separately.

Only the creator receives this link.

### Handwritten Experience

- Envelope animation
- Wax seal
- Paper unfolding
- Handwritten typography
- Responsive design
- Dark mode

### Accessibility

- Keyboard navigation
- Screen reader support
- Reduced motion
- High contrast
- Mobile friendly

### Download

Export the letter as a PNG image.

### Share

Native Share API (when supported) with clipboard fallback.

### Spotify Music Integration

Attach a Spotify track URL to your letter. Readers can play and listen to the song while reading to enhance the emotional atmosphere.

### QR Code Sharing

Generate a unique QR code for each letter, allowing readers to scan and open the letter instantly on their mobile devices.

---

## Tech Stack

### Frontend

- Next.js (App Router)
- TypeScript
- Tailwind CSS v4
- Framer Motion
- React Hook Form
- Zod

### Backend

- Next.js Server Actions
- Supabase Client SDK

### Database

PostgreSQL (Supabase)

### Deployment

- Vercel
- GitHub

---

## Screens

```
/

Landing Page

/create

Create Letter

/code

Open by Code

/letter/[code]

Read Letter

/edit/[token]

Edit Letter
```

---

## Project Philosophy

Digital Letter is not intended to become another messaging platform.

Instead, it focuses on delivering one meaningful experience:

**Opening a beautiful personal letter.**

Everything else is secondary.

---

## Installation

```bash
git clone <repository>

cd soorad

pnpm install

cp .env.example .env.local

pnpm dev
```

---

## Environment Variables

The project uses Supabase for database storage and authentication. Copy `.env.example` to `.env.local` and fill in your Supabase project API keys:

```
NEXT_PUBLIC_SUPABASE_URL=

NEXT_PUBLIC_SUPABASE_ANON_KEY=

SUPABASE_SERVICE_ROLE_KEY=
```

---

## Folder Structure

```
app/          # Next.js app router pages, layouts, and global styles

components/   # React components (UI components and feature-specific components)

lib/          # Client and server utility functions and Supabase client configuration

server/       # Server actions (in server/actions/) and database service layers (in server/services/)

supabase/     # Database migrations
```

---

## Design Decisions

See:

```
DESIGN.md
```

---

## License

MIT
