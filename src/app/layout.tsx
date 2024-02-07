import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Gematria Calculator",
  description: "Decode words using various historical and non-historical ciphers.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
