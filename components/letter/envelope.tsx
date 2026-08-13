'use client'

import { motion, useReducedMotion } from 'motion/react'
import { Heart } from 'lucide-react'
import type { Letter } from '@/lib/letters'

export function Envelope({
  letter,
  opening,
  onOpen,
}: {
  letter: Letter
  opening: boolean
  onOpen: () => void
}) {
  const reduce = useReducedMotion()

  return (
    <div className="flex flex-col items-center gap-8">
      <motion.button
        type="button"
        onClick={onOpen}
        disabled={opening}
        aria-label={`Open the letter from ${letter.sender} to ${letter.receiver}`}
        className="group relative rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
        style={{ perspective: 1200 }}
        animate={opening ? { y: reduce ? 0 : -8 } : { y: 0 }}
        whileHover={opening ? undefined : { y: -4 }}
        transition={{ duration: 0.4 }}
      >
        {/* Envelope body */}
        <div className="relative h-52 w-80 sm:h-56 sm:w-96">
          {/* peeking paper that rises when opening */}
          <motion.div
            className="absolute inset-x-6 top-4 h-40 rounded-md border border-seam bg-paper shadow-sm"
            initial={{ y: 20 }}
            animate={opening ? { y: reduce ? 0 : -56 } : { y: 20 }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: reduce ? 0 : 0.5 }}
          />

          {/* back panel */}
          <div className="absolute inset-0 rounded-xl bg-envelope shadow-xl" />

          {/* front pocket (triangle up from bottom) */}
          <div
            className="absolute inset-0 rounded-xl bg-envelope-shade"
            style={{ clipPath: 'polygon(0 100%, 100% 100%, 50% 38%)' }}
          />
          {/* left & right seams */}
          <div
            className="absolute inset-0 rounded-xl bg-envelope"
            style={{ clipPath: 'polygon(0 12%, 0 100%, 50% 55%)' }}
          />
          <div
            className="absolute inset-0 rounded-xl bg-envelope"
            style={{ clipPath: 'polygon(100% 12%, 100% 100%, 50% 55%)' }}
          />

          {/* To / From text on the pocket */}
          <div className="absolute inset-x-0 bottom-6 flex flex-col items-center gap-0.5">
            <span className="font-serif text-xs uppercase tracking-[0.3em] text-foreground/50">
              to
            </span>
            <span className="font-hand text-3xl text-foreground/80">{letter.receiver}</span>
          </div>

          {/* Flap */}
          <motion.div
            className="absolute inset-x-0 top-0 origin-top"
            style={{
              height: '62%',
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            }}
            initial={{ rotateX: 0 }}
            animate={opening ? { rotateX: reduce ? 0 : -175 } : { rotateX: 0 }}
            transition={{ duration: 0.75, ease: 'easeInOut', delay: reduce ? 0 : 0.35 }}
          >
            <div className="h-full w-full rounded-t-xl bg-envelope shadow-[inset_0_-2px_8px_rgba(0,0,0,0.08)]" />
          </motion.div>

          {/* Wax seal */}
          <motion.div
            className="absolute left-1/2 top-[52%] z-10 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-wax text-wax-foreground shadow-lg"
            style={{
              backfaceVisibility: 'hidden',
              boxShadow: '0 6px 16px rgba(0,0,0,0.25), inset 0 0 0 1px rgba(255,255,255,0.15)',
            }}
            initial={{ scale: 1, opacity: 1 }}
            animate={
              opening
                ? { scale: reduce ? 1 : [1, 1.12, 0.4], opacity: [1, 1, 0], rotate: reduce ? 0 : -18 }
                : { scale: 1, opacity: 1, rotate: 0 }
            }
            transition={{ duration: 0.4, ease: 'easeIn', times: [0, 0.5, 1] }}
          >
            <span
              className="absolute inset-1.5 rounded-full border border-wax-foreground/30"
              aria-hidden="true"
            />
            <Heart className="size-6 fill-current" />
          </motion.div>
        </div>
      </motion.button>

      {!opening ? (
        <div className="flex flex-col items-center gap-1 text-center">
          <p className="font-serif text-lg text-foreground">
            A letter from {letter.sender}
          </p>
          <p className="animate-pulse font-hand text-2xl text-muted-foreground">
            Press the seal to open
          </p>
        </div>
      ) : null}
    </div>
  )
}
