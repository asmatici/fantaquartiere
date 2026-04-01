'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const [utente, setUtente] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const getUtente = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
      } else {
        setUtente(user)
      }
    }
    getUtente()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (!utente) return <div className="min-h-screen bg-gray-900 flex items-center justify-center"><p className="text-white">Caricamento...</p></div>

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">⚽ FantaQuartiere</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-400 text-sm">{utente.email}</span>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition"
          >
            Esci
          </button>
        </div>
      </div>

      {/* Menu principale */}
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Benvenuto! 👋</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-800 p-6 rounded-xl cursor-pointer hover:bg-gray-700 transition">
            <div className="text-4xl mb-3">🏆</div>
            <h3 className="text-xl font-bold mb-2">Torneo</h3>
            <p className="text-gray-400">Gestisci squadre, giocatori e risultati del torneo reale</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl cursor-pointer hover:bg-gray-700 transition">
            <div className="text-4xl mb-3">⚽</div>
            <h3 className="text-xl font-bold mb-2">Fantacalcio</h3>
            <p className="text-gray-400">Gestisci le leghe, le rose e le formazioni</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl cursor-pointer hover:bg-gray-700 transition">
            <div className="text-4xl mb-3">📊</div>
            <h3 className="text-xl font-bold mb-2">Classifiche</h3>
            <p className="text-gray-400">Visualizza le classifiche del torneo e del fanta</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl cursor-pointer hover:bg-gray-700 transition">
            <div className="text-4xl mb-3">👤</div>
            <h3 className="text-xl font-bold mb-2">Profilo</h3>
            <p className="text-gray-400">Gestisci il tuo profilo e le impostazioni</p>
          </div>
        </div>
      </div>
    </div>
  )
}