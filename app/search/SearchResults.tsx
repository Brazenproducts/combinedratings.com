'use client'

import { useState } from 'react'
import { RestaurantCard } from '@/components/RestaurantCard'
import { TimeframeTabs } from '@/components/TimeframeTabs'
import { ScoreTimeframe, getScore } from '@/lib/utils'
import { RecentRating } from '@/lib/supabase'

type Props = {
  results: RecentRating[]
}

export function SearchResults({ results }: Props) {
  const [timeframe, setTimeframe] = useState<ScoreTimeframe>('90d')
  const [sortAsc, setSortAsc] = useState(false)

  const sorted = [...results].sort((a, b) => {
    const scoreA = getScore(a, timeframe) ?? -1
    const scoreB = getScore(b, timeframe) ?? -1
    return sortAsc ? scoreA - scoreB : scoreB - scoreA
  })

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <TimeframeTabs active={timeframe} onChange={setTimeframe} />
        <button
          onClick={() => setSortAsc(!sortAsc)}
          className="text-sm text-gray-500 hover:text-blue-700 transition-colors"
        >
          Sort: {sortAsc ? 'Lowest first ↑' : 'Highest first ↓'}
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sorted.map(r => (
          <RestaurantCard key={r.restaurant_slug} restaurant={r} timeframe={timeframe} />
        ))}
      </div>
    </div>
  )
}
