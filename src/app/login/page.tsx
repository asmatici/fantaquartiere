'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errore, setErrore] = useState('')
  const router = useRouter()

  const handleLogin = async () => {
    setLoading(true)
    setErrore('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setErrore('Email o password errati')
    } else {
      router.push('/')
    }
    setLoading(false)
  }

  const handleRegistrati = async () => {
    setLoading(true)
    setErrore('')
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) {
      setErrore('Errore durante la registrazione')
    } else {
      setErrore('Controlla la tua email per confermare la registrazione!')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-white mb-2 text-center">⚽ FantaQuartiere</h1>
        <p className="text-gray-400 text-center mb-6">Accedi o registrati</p>
        
        {errore && (
          <p className="text-red-400 text-center mb-4">{errore}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-700 text-white mb-3 outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-700 text-white mb-6 outline-none"
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg mb-3 transition"
        >
          {loading ? 'Caricamento...' : 'Accedi'}
        </button>

        <button
          onClick={handleRegistrati}
          disabled={loading}
          className="w-full bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 rounded-lg transition"
        >
          {loading ? 'Caricamento...' : 'Registrati'}
        </button>
      </div>
    </div>
  )
}