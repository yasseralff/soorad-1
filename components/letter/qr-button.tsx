'use client'

import { useEffect, useRef, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { motion, AnimatePresence } from 'motion/react'
import { QrCode, X, Download } from 'lucide-react'
import { SealMark } from '@/components/seal-mark'

interface QrProps {
  url: string
  receiver: string
}

// ─── Shared modal content ────────────────────────────────────────────────────

export function QrModal({
  url,
  receiver,
  open,
  onClose,
}: QrProps & { open: boolean; onClose: () => void }) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  function downloadQr() {
    const svg = svgRef.current
    if (!svg) return
    const serialized = new XMLSerializer().serializeToString(svg)
    const blob = new Blob([serialized], { type: 'image/svg+xml' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `letter-qr-${receiver.toLowerCase().replace(/\s+/g, '-')}.svg`
    a.click()
    URL.revokeObjectURL(a.href)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="qr-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          {/* Frosted backdrop */}
          <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />

          {/* Card — centered, constrained width */}
          <motion.div
            className="relative z-10 mx-auto flex w-full max-w-xs flex-col items-center gap-6 rounded-3xl border border-seam bg-paper px-8 py-10 shadow-2xl"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close QR code"
              className="absolute right-4 top-4 inline-flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X className="size-4" />
            </button>

            {/* Header */}
            <div className="flex flex-col items-center gap-2 text-center">
              <SealMark className="size-10 opacity-80" />
              <p className="font-serif text-sm uppercase tracking-[0.3em] text-muted-foreground">
                Scan to open
              </p>
              <h2 className="font-serif text-2xl font-medium text-paper-foreground">
                A letter for {receiver}
              </h2>
            </div>

            {/* QR */}
            <div className="relative rounded-2xl border border-seam bg-white p-4 shadow-inner">
              <span className="absolute left-1.5 top-1.5 size-3 rounded-tl border-l-2 border-t-2 border-muted-foreground/30" />
              <span className="absolute right-1.5 top-1.5 size-3 rounded-tr border-r-2 border-t-2 border-muted-foreground/30" />
              <span className="absolute bottom-1.5 left-1.5 size-3 rounded-bl border-b-2 border-l-2 border-muted-foreground/30" />
              <span className="absolute bottom-1.5 right-1.5 size-3 rounded-br border-b-2 border-r-2 border-muted-foreground/30" />
              <QRCodeSVG
                ref={svgRef}
                value={url}
                size={200}
                level="M"
                fgColor="#2c2520"
                bgColor="transparent"
                imageSettings={{
                  src: '/icon.ico',
                  height: 32,
                  width: 32,
                  excavate: true,
                }}
              />
            </div>

            {/* URL hint */}
            <p className="max-w-[220px] break-all text-center font-mono text-[11px] text-muted-foreground">
              {url}
            </p>

            {/* Download */}
            <button
              type="button"
              onClick={downloadQr}
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 font-serif text-sm text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Download className="size-4" />
              Save QR code
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── Toolbar trigger button ───────────────────────────────────────────────────

export function QrButton({ url, receiver }: QrProps) {
  const [open, setOpen] = useState(false)

  const btn =
    'inline-flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Show QR code"
        className={btn}
      >
        <QrCode className="size-[18px]" />
      </button>
      <QrModal url={url} receiver={receiver} open={open} onClose={() => setOpen(false)} />
    </>
  )
}
