# 💌 Digital Letter

> Create beautiful handwritten digital letters that can be shared through a unique code or link.

---

# Philosophy

This project is **not** a CRUD application.

The primary goal is to create an emotional experience that feels like opening a real handwritten letter.

Every interaction should support that feeling.

When making design decisions, prioritize:

1. Simplicity
2. Emotion
3. Accessibility
4. Readability
5. Delight

Features should never distract from the letter itself.

---

# Core Principles

## Less is More

Every page should have one clear purpose.

Avoid unnecessary navigation, settings, or clutter.

---

## The Letter Comes First

The content is the hero.

The UI should disappear while reading.

No advertisements.

No sidebars.

No notifications.

---

## Calm Interface

Inspired by:

- Apple
- Notion
- Medium
- Muji

Use whitespace generously.

Avoid loud colors.

Avoid unnecessary animations.

---

## Delight Through Motion

Animations exist to improve storytelling.

Never animate for decoration.

Examples:

- Envelope opening
- Paper unfolding
- Letter fading in
- Signature appearing last

Respect `prefers-reduced-motion`.

---

# User Flow

## Sender

Home

↓

Create Letter

↓

Receive

- Reader Link
- Reader Code
- Creator Link

↓

Share

---

## Receiver

Home

↓

Enter Code

or

Open Link

↓

Envelope

↓

Open Letter

↓

Read

---

# Pages

/

Landing page

---

/create

Create a letter

---

/code

Enter letter code

---

/letter/[code]

Read a letter

---

/edit/[token]

Edit existing letter

Accessible only through the creator token.

---

# Color Palette

## Light Mode

Background

bg-stone-100

Paper

bg-white

Envelope

bg-amber-50

Borders

border-stone-200

Text

text-stone-800

Accent

text-rose-400

---

## Dark Mode

Background

bg-zinc-900

Paper

bg-stone-800

Envelope

bg-stone-700

Text

text-stone-100

Accent

text-rose-300

---

# Typography

Headings

Cormorant Garamond

Body

Patrick Hand

Fallback

Inter

Letter spacing should feel natural.

Body text should be comfortable to read.

---

# Layout

Container

max-w-3xl

Centered horizontally.

Letter width should never exceed readable limits.

Desktop:

Centered.

Mobile:

Nearly full width.

Never allow horizontal scrolling.

---

# Components

## Envelope

Displays sender and receiver.

Contains:

- Wax seal
- Tap to Open

Opening animation:

1. Seal breaks
2. Flap opens
3. Paper slides upward
4. Letter fades in

---

## Letter

Contains:

Sender

Receiver

Body

Signature

Toolbar

Toolbar stays hidden until letter is opened.

Contains:

- Share
- Download
- Theme Toggle

---

## Create Form

Sections

Sender

Receiver

Letter

Code

Submit

Avoid long overwhelming forms.

---

# Accessibility

Minimum body font:

18px

Minimum touch targets:

44px

Keyboard accessible

Visible focus states

ARIA labels where appropriate

High color contrast

Reduced motion support

Dark mode support

---

# Motion

Use Framer Motion.

Animations should feel:

Slow

Gentle

Intentional

Avoid bounce animations.

Preferred easing:

easeInOut

Animation duration:

200–700ms

---

# Security

Anonymous project.

No login.

Creator receives:

- Reader Link
- Reader Code
- Secret Creator Link

Creator link uses a random edit token.

Never expose edit tokens publicly.

Prevent:

- XSS
- Spam
- Duplicate codes

---

# Responsive Design

Mobile First.

Supported sizes:

320px

375px

768px

1024px

1440px

---

# Future Features

- Images
- Background music
- Password protected letters
- Scheduled opening
- Read once
- Themes
- QR code sharing
- Markdown
- Voice message
- Emoji reactions

---

# Non Goals

Do not become:

- Social media
- Messaging platform
- Email replacement
- Blog platform

The product exists for one purpose:

Deliver beautiful digital letters.
