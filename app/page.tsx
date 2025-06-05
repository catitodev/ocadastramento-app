"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // Redirecionar para login por padrão
    router.push("/login")
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-green-700 mb-4">OCAdastramento</h1>
        <p className="text-gray-600">Redirecionando...</p>
      </div>
    </div>
  )
}
