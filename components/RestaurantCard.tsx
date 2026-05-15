'use client'

import Link from 'next/link'
import { ScoreBadge } from './ScoreBadge'
import { ScoreTimeframe, getScore } from '@/lib/utils'
import { RecentRating } from '@/lib/supabase'

type RestaurantCardProps = {
  restaurant: RecentRating
  timeframe: ScoreTimeframe
}

export function RestaurantCard({ restaurant, timeframe }: RestaurantCardProps) {
  const score = getScore(restaurant, timeframe)

  const timeframeLabel = {
    '90d': 'Last 90 Days',
    '365d': 'Last Year',
    'alltime': 'All Time',
  }[timeframe]

  return (
    <Link href={`/r/${restaurant.restaurant_slug}`}>
      <div className="bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all p-4 flex items-center gap-4 cursor-pointer">
        <ScoreBadge score={score} size="md" />
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 truncate">{restaurant.restaurant_name}</h3>
          <p className="text-sm text-gray-500">{restaurant.city}, {restaurant.state}</p>
          <p className="text-xs text-gray-400 mt-0.5">{timeframeLabel} combined score</p>
        </div>
        <div className="text-right shrink-0">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <span>G</span>
            <span className="font-semibold text-gray-700">{restaurant.google_rating_alltime?.toFixed(1) ?? '—'}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
            <span>Y</span>
            <span className="font-semibold text-gray-700">{restaurant.yelp_rating_alltime?.toFixed(1) ?? '—'}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
