'use client'

import { useState } from 'react'
import { RestaurantCard } from '@/components/RestaurantCard'
import { TimeframeTabs } from '@/components/TimeframeTabs'
import { ScoreTimeframe, getScore } from '@/lib/utils'
import { RecentRating } from '@/lib/supabase'

type Props = {
  restaurants: RecentRating[]
}

export function CityContent({ restaurants }: Props) {
  const [timeframe, setTimeframe] = useState<ScoreTimeframe>('90d')

  const sorted = [...restaurants].sort((a, b) => {
    const scoreA = getScore(a, timeframe) ?? -1
    const scoreB = getScore(b, timeframe) ?? -1
    return scoreB - scoreA
  })

  return (
    <div>
      <div className="mb-6">
        <TimeframeTabs active={timeframe} onChange={setTimeframe} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sorted.map(r => (
          <RestaurantCard key={r.restaurant_slug} restaurant={r} timeframe={timeframe} />
        ))}
      </div>
    </div>
  )
}
