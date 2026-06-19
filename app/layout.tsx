import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
})

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'Era | DNA-Powered Skincare & Hair Regrowth',
  description: 'Era is an at-home DNA testing platform for skincare and hair regrowth. Swab your cheek, send it in, and get physician-prescribed treatments tailored to your genetics—delivered to your door.',
  keywords: ['DNA test', 'at-home DNA kit', 'skincare', 'hair regrowth', 'hair loss', 'genetic testing', 'personalized skincare', 'telehealth', 'prescription skincare'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
