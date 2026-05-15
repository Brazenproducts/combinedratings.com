'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

type SearchBarProps = {
  initialQuery?: string
  initialCity?: string
  large?: boolean
}

export function SearchBar({ initialQuery = '', initialCity = '', large = false }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery)
  const [city, setCity] = useState(initialCity)
  const router = useRouter()

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (query.trim()) params.set('q', query.trim())
    if (city.trim()) params.set('city', city.trim())
    router.push(`/search?${params.toString()}`)
  }

  const inputClass = large
    ? 'w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base'
    : 'w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm'

  const btnClass = large
    ? 'px-6 py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors whitespace-nowrap text-base'
    : 'px-4 py-2 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors whitespace-nowrap text-sm'

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 w-full">
      <input
        type="text"
        placeholder="Restaurant name..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        className={inputClass}
      />
      <input
        type="text"
        placeholder="City..."
        value={city}
        onChange={e => setCity(e.target.value)}
        className={inputClass}
      />
      <button type="submit" className={btnClass}>
        Search
      </button>
    </form>
  )
}
