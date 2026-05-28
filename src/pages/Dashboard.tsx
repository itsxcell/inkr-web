import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import api from '../lib/api'

interface Generation {
  id: string
  title: string
  model: string
  creditsUsed: number
  createdAt: string
}

interface GenerationFull extends Generation {
  prompt: string
  response: string
}

export const Dashboard = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [credits, setCredits] = useState(user?.creditBalance || 0)
  const [history, setHistory] = useState<Generation[]>([])
  const [selected, setSelected] = useState<GenerationFull | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchHistory()
    fetchBalance()
  }, [])

  const fetchBalance = async () => {
    const res = await api.get('/api/credits/balance')
    setCredits(res.data.creditBalance)
  }

  const fetchHistory = async () => {
    const res = await api.get('/api/generations')
    setHistory(res.data)
  }

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    setError('')
    setLoading(true)
    setSelected(null)
    setResponse('')

    try {
      const res = await api.post('/api/generations', { prompt })
      setResponse(res.data.generation.response)
      setCredits(res.data.remainingBalance)
      fetchHistory()
    } catch (err: any) {
      if (err.response?.status === 402) {
        setError('Insufficient credits. Please top up.')
      } else {
        setError(err.response?.data?.error || 'Something went wrong')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSelectHistory = async (id: string) => {
    const res = await api.get(`/api/generations/${id}`)
    setSelected(res.data)
    setPrompt(res.data.prompt)
    setResponse(res.data.response)
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleTopUp = async (packageId: string) => {
    try {
        const res = await api.post('/api/stripe/checkout', { packageId })
        window.location.href = res.data.url
    } catch (err: any) {
        setError('Could not initiate checkout')
    }
    }
  return (
    <div className="min-h-screen bg-zinc-950 flex">
      {/* Sidebar */}
      <div className="w-72 bg-zinc-900 border-r border-zinc-800 flex flex-col">
        <div className="p-4 border-b border-zinc-800">
          <h1 className="text-xl font-bold text-white">Inkr</h1>
          <p className="text-xs text-zinc-500 mt-0.5">Write like you mean business</p>
        </div>

<div className="p-4 border-b border-zinc-800">
  <div className="bg-zinc-800 rounded-lg p-3 mb-3">
    <p className="text-xs text-zinc-500 mb-1">Credits remaining</p>
    <p className="text-2xl font-bold text-amber-500">{credits}</p>
  </div>
  <div className="space-y-2">
    {[
      { id: 'starter', label: 'Starter', credits: 100, price: '$5' },
      { id: 'pro', label: 'Pro', credits: 500, price: '$20' },
      { id: 'enterprise', label: 'Enterprise', credits: 1500, price: '$50' },
    ].map((pkg) => (
      <button
        key={pkg.id}
        onClick={() => handleTopUp(pkg.id)}
        className="w-full text-left px-3 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
      >
            <div className="flex items-center justify-between">
                <span className="text-sm text-white">{pkg.label}</span>
                <span className="text-xs text-amber-500">{pkg.price}</span>
                </div>
                <p className="text-xs text-zinc-500">{pkg.credits} credits</p>
            </button>
            ))}
        </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <p className="text-xs text-zinc-500 uppercase tracking-wider mb-3">History</p>
          {history.length === 0 ? (
            <p className="text-sm text-zinc-600">No generations yet</p>
          ) : (
            <div className="space-y-1">
              {history.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelectHistory(item.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    selected?.id === item.id
                      ? 'bg-zinc-700 text-white'
                      : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                  }`}
                >
                  <p className="truncate">{item.title}</p>
                  <p className="text-xs text-zinc-600 mt-0.5">{item.creditsUsed} credits</p>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 border-t border-zinc-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-zinc-950 font-bold text-sm">
              {user?.name[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white truncate">{user?.name}</p>
              <p className="text-xs text-zinc-500 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full text-sm text-zinc-500 hover:text-white transition-colors text-left"
          >
            Sign out
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-8">
          {response ? (
            <div className="max-w-3xl mx-auto">
              <div className="mb-6 p-4 bg-zinc-900 rounded-xl border border-zinc-800">
                <p className="text-xs text-zinc-500 mb-2">Your prompt</p>
                <p className="text-white">{prompt}</p>
              </div>
              <div className="p-4 bg-zinc-900 rounded-xl border border-zinc-800">
                <p className="text-xs text-zinc-500 mb-2">Response</p>
                <p className="text-zinc-300 whitespace-pre-wrap">{response}</p>
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto flex flex-col items-center justify-center h-full text-center">
              <h2 className="text-2xl font-bold text-white mb-2">What do you need to write?</h2>
              <p className="text-zinc-500">Proposals, emails, pitches — describe it below</p>
            </div>
          )}
        </div>

        {error && (
          <div className="mx-8 mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        <div className="p-6 border-t border-zinc-800">
          <div className="max-w-3xl mx-auto flex gap-3">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleGenerate()
                }
              }}
              placeholder="Write a proposal for a web development project..."
              rows={3}
              className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition-colors resize-none"
            />
            <button
              onClick={handleGenerate}
              disabled={loading || !prompt.trim()}
              className="bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-zinc-950 font-semibold rounded-xl px-6 transition-colors"
            >
              {loading ? '...' : 'Generate'}
            </button>
          </div>
          <p className="text-center text-xs text-zinc-600 mt-2">Press Enter to generate · Shift+Enter for new line</p>
        </div>
      </div>
    </div>
  )
}