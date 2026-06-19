"use client"

import type React from "react"
import { Suspense, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"

function GateForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const from = searchParams.get("from") || "/"

  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch("/api/gate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })

      if (res.ok) {
        router.replace(from)
        router.refresh()
      } else {
        setError("Incorrect password")
        setLoading(false)
      }
    } catch {
      setError("Incorrect password")
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-sm">
      <div className="flex flex-col items-center text-center">
        <Image
          src="/images/era-logo.png"
          alt="Era"
          width={120}
          height={40}
          priority
          className="h-8 w-auto invert"
        />
        <p className="mt-8 text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">
          Private Preview
        </p>
        <h1 className="mt-3 text-2xl font-serif font-medium text-neutral-50 text-balance">
          This site is password protected
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-neutral-400">
          Enter the access password to continue to the preview.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3">
        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <input
          id="password"
          type="password"
          autoFocus
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          aria-invalid={error ? true : undefined}
          className="h-12 w-full rounded-lg border border-neutral-700 bg-neutral-900 px-4 text-neutral-50 placeholder:text-neutral-500 outline-none transition-colors focus:border-neutral-400"
        />

        {error && (
          <p role="alert" className="text-sm text-red-400">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading || password.length === 0}
          className="mt-1 h-12 w-full rounded-lg bg-neutral-50 px-4 font-medium text-neutral-950 transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Enter Site"}
        </button>
      </form>
    </div>
  )
}

export default function GatePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-950 px-6 py-16">
      <Suspense fallback={null}>
        <GateForm />
      </Suspense>
    </main>
  )
}
