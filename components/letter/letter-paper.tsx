'use client'

import { forwardRef } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import type { Letter } from '@/lib/letters'

export const LetterPaper = forwardRef<HTMLDivElement, { letter: Letter }>(
  function LetterPaper({ letter }, ref) {
    const reduce = useReducedMotion()
    const paragraphs = letter.body.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean)

    const container = {
      hidden: {},
      show: {
        transition: { staggerChildren: reduce ? 0 : 0.18, delayChildren: reduce ? 0 : 0.2 },
      },
    } as const
    const line = {
      hidden: { opacity: 0, y: reduce ? 0 : 8 },
      show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    } as const

    return (
      <div
        ref={ref}
        className="relative flex flex-col gap-8 w-full max-w-3xl overflow-hidden rounded-3xl border border-seam bg-paper p-8 text-paper-foreground shadow-xl sm:p-10 md:p-14"
      >
        {/* subtle deckled top edge */}
        <div className="h-px w-16 bg-seam self-center" aria-hidden="true" />

        <motion.div variants={container} initial="hidden" animate="show" className="space-y-7">
          <motion.p
            variants={line}
            className="font-serif text-3xl font-medium italic text-paper-foreground sm:text-4xl"
          >
            Dear {letter.receiver},
          </motion.p>

          {paragraphs.map((p, i) => (
            <motion.p
              key={i}
              variants={line}
              className="font-hand text-2xl leading-relaxed tracking-wide text-paper-foreground/90 sm:text-[1.7rem]"
            >
              {p}
            </motion.p>
          ))}

          <motion.div
            variants={line}
            transition={{ delay: reduce ? 0 : 0.5, duration: 0.7, ease: 'easeOut' }}
            className="flex flex-col gap-1 pt-4"
          >
            <p className="font-hand text-xl text-muted-foreground">Warm regards,</p>
            <p className="font-hand text-3xl text-paper-foreground sm:text-4xl">
              {letter.sender}
            </p>
          </motion.div>
        </motion.div>

        <div className="h-px w-16 bg-seam self-center" aria-hidden="true" />
      </div>
    )
  },
)
