import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "OCAdastramento - OCA PA Quilombo",
  description: "Sistema de automação social regenerativa para comunidades quilombolas",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  )
}
