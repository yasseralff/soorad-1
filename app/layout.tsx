import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Patrick_Hand } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
})

const patrickHand = Patrick_Hand({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-caveat',
})

export const metadata: Metadata = {
  title: 'Letters — some words are easier written than spoken',
  description:
    'Create beautiful handwritten digital letters and share them through a unique code or link.',
  generator: 'v0.app',
  robots: { index: false, follow: false },
  icons: {
    icon: '/icon.ico',
    apple: '/icon.ico',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f4f1ec' },
    { media: '(prefers-color-scheme: dark)', color: '#2a2723' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`bg-background ${cormorant.variable} ${patrickHand.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('letters-theme');if(t==='light'||t==='dark'){document.documentElement.classList.add(t);}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
