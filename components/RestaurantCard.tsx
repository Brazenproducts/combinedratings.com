'use client'

import Link from 'next/link'
import { ScoreBadge } from './ScoreBadge'
import { ScoreTimeframe, getScore } from '@/lib/utils'
import { RecentRating } from '@/lib/supabase'

type RestaurantCardProps = {
  restaurant: RecentRating & { preferred_timeframe?: 'alltime' | '365d' | '90d' | null; is_certified?: boolean }
  timeframe: ScoreTimeframe
}

export function RestaurantCard({ restaurant, timeframe }: RestaurantCardProps) {
  // Paid/certified listings show their preferred timeframe regardless of global toggle
  const effectiveTimeframe: ScoreTimeframe =
    restaurant.is_certified && restaurant.preferred_timeframe
      ? (restaurant.preferred_timeframe as ScoreTimeframe)
      : timeframe

  const score = getScore(restaurant, effectiveTimeframe)

  const timeframeLabel: Record<ScoreTimeframe, string> = {
    '90d': 'Last 90 Days',
    '365d': 'Last Year',
    'alltime': 'All Time',
  }

  const isUsingPreferred = restaurant.is_certified && restaurant.preferred_timeframe && restaurant.preferred_timeframe !== timeframe

  return (
    <Link href={`/r/${restaurant.restaurant_slug}`}>
      <div className={`bg-white rounded-xl border hover:shadow-md transition-all p-4 flex items-center gap-4 cursor-pointer ${
        restaurant.is_certified
          ? 'border-blue-300 ring-1 ring-blue-100'
          : 'border-gray-200 hover:border-blue-300'
      }`}>
        <ScoreBadge score={score} size="md" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h3 className="font-bold text-gray-900 truncate">{restaurant.restaurant_name}</h3>
            {restaurant.is_certified && (
              <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full font-semibold shrink-0">✓ Featured</span>
            )}
          </div>
          <p className="text-sm text-gray-500">{restaurant.city}, {restaurant.state}</p>
          <p className="text-xs mt-0.5">
            {isUsingPreferred ? (
              <span className="text-blue-600 font-medium">⭐ {timeframeLabel[effectiveTimeframe]} score</span>
            ) : (
              <span className="text-gray-400">{timeframeLabel[effectiveTimeframe]} combined score</span>
            )}
          </p>
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
