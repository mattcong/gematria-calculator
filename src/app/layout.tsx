import type { Metadata } from "next"
import "./globals.css"
import Footer from "@/components/Footer"

export const metadata: Metadata = {
  title: "Gematria Calculator",
  description: "Decode words using various historical and non-historical ciphers.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Footer />
      </body>
    </html>
  )
}
