'use client'

import { useState } from 'react'
import { loginAction } from './action'
import { Lock, Mail, Loader2 } from 'lucide-react'

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const res = await loginAction(email, password)

    if (res?.error) {
      setError(res.error)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 border"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Admin Login</h1>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label>Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              name="email"
              type="email"
              required
              className="pl-10 w-full border p-3 rounded"
            />
          </div>
        </div>

        <div className="mb-6">
          <label>Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              name="password"
              type="password"
              required
              className="pl-10 w-full border p-3 rounded"
            />
          </div>
        </div>

        <button
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded flex justify-center"
        >
          {loading ? <Loader2 className="animate-spin" /> : 'Login'}
        </button>
      </form>
    </div>
  )
}
