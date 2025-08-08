import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Extious - Online Resume',
  description: 'Interactive online resume with export features',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
