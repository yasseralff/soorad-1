'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Envelope } from '@/components/letter/envelope'
import { LetterPaper } from '@/components/letter/letter-paper'
import { LetterToolbar } from '@/components/letter/letter-toolbar'
import { SpotifyEmbed } from '@/components/letter/spotify-embed'
import { SealMark } from '@/components/seal-mark'
import type { Letter } from '@/lib/letters'

type Stage = 'sealed' | 'opening' | 'open'

export function LetterExperience({ letter }: { letter: Letter }) {
  const [stage, setStage] = useState<Stage>('sealed')
  const reduce = useReducedMotion()
  const paperRef = useRef<HTMLDivElement>(null)

  function open() {
    if (stage !== 'sealed') return
    setStage('opening')
    // Let the wax crack, flap lift, and paper peek before revealing the letter.
    window.setTimeout(() => setStage('open'), reduce ? 200 : 1600)
  }

  return (
    <div className="relative flex min-h-dvh w-full flex-col items-center justify-center px-6 py-16">
      <div className="absolute left-6 top-6 z-20">
        <Link
          href="/"
          aria-label="Go to home"
          className="inline-flex items-center justify-center rounded-full transition-transform hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <SealMark className="size-9 shadow-sm" />
        </Link>
      </div>

      <AnimatePresence mode="wait">
        {stage !== 'open' ? (
          <motion.div
            key="envelope"
            exit={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
            transition={{ duration: 0.4 }}
          >
            <Envelope letter={letter} opening={stage === 'opening'} onOpen={open} />
          </motion.div>
        ) : (
          <motion.div
            key="letter"
            className="w-full"
            initial={{ opacity: 0, y: reduce ? 0 : 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <LetterPaper ref={paperRef} letter={letter} />

            {letter.songUrl ? (
              <div className="mx-auto w-full max-w-3xl px-2">
                <SpotifyEmbed spotifyUrl={letter.songUrl} letterOpened={stage === 'open'} />
              </div>
            ) : null}

            <motion.div
              className="sticky bottom-6 mt-10 flex justify-center"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduce ? 0 : 1.4, duration: 0.5 }}
            >
              <LetterToolbar targetRef={paperRef} receiver={letter.receiver} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
