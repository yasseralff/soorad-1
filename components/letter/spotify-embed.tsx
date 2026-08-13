'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Music2 } from 'lucide-react'

interface SpotifyEmbedProps {
  spotifyUrl: string
  /** Whether the letter has been opened — triggers autoplay */
  letterOpened: boolean
}

function extractTrackId(url: string): string | null {
  const match = url.match(/open\.spotify\.com\/track\/([A-Za-z0-9]+)/)
  return match ? match[1] : null
}

export function SpotifyEmbed({ spotifyUrl, letterOpened }: SpotifyEmbedProps) {
  const reduce = useReducedMotion()
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [visible, setVisible] = useState(false)
  const [iframeKey, setIframeKey] = useState(0)

  const trackId = extractTrackId(spotifyUrl)

  // Reveal the embed shortly after the letter opens, triggering autoplay
  useEffect(() => {
    if (!letterOpened) return
    const timer = setTimeout(() => setVisible(true), 600)
    return () => clearTimeout(timer)
  }, [letterOpened])

  // Loop: Spotify's embed sends a postMessage when the preview ends.
  // We listen for it and reload the iframe (bumping the key) to restart.
  const handleMessage = useCallback(
    (event: MessageEvent) => {
      if (!trackId) return
      try {
        const data =
          typeof event.data === 'string' ? JSON.parse(event.data) : event.data
        // Spotify sends { type: 'ready' | 'playback_update', ... }
        // When the 30s preview ends, payload.duration === payload.position
        if (
          data?.type === 'playback_update' &&
          data?.payload?.duration > 0 &&
          data?.payload?.position >= data?.payload?.duration - 1
        ) {
          // Restart by remounting the iframe
          setIframeKey((k) => k + 1)
        }
      } catch {
        // Non-JSON messages from other origins — ignore
      }
    },
    [trackId],
  )

  useEffect(() => {
    if (!visible) return
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [visible, handleMessage])

  if (!trackId) return null

  // autoplay=1 starts the 30s preview immediately on mount
  const embedUrl = `https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0&autoplay=1`

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ duration: reduce ? 0 : 0.6, ease: 'easeOut' }}
      className="mt-8 overflow-hidden rounded-xl"
      aria-label="Background music player"
    >
      <div className="flex items-center gap-1.5 mb-2 px-1">
        <Music2 className="size-3.5 text-muted-foreground" />
        <span className="text-xs text-muted-foreground font-serif tracking-wide">
          A song for this letter
        </span>
      </div>
      {visible && (
        <iframe
          key={iframeKey}
          ref={iframeRef}
          src={embedUrl}
          title="Spotify track preview"
          width="100%"
          height="80"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="eager"
          className="rounded-xl border-0"
          style={{ colorScheme: 'normal' }}
        />
      )}
    </motion.div>
  )
}
