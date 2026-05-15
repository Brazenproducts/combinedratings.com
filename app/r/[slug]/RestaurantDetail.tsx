'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ScoreBadge, ScoreRing } from '@/components/ScoreBadge'
import { TimeframeTabs } from '@/components/TimeframeTabs'
import { ScoreTimeframe, getScore, formatScore } from '@/lib/utils'
import { RecentRating } from '@/lib/supabase'

type Props = {
  restaurant: RecentRating
}

export function RestaurantDetail({ restaurant }: Props) {
  const [timeframe, setTimeframe] = useState<ScoreTimeframe>('90d')
  const currentScore = getScore(restaurant, timeframe)

  const googleScore = {
    '90d': restaurant.google_rating_90d,
    '365d': restaurant.google_rating_365d,
    'alltime': restaurant.google_rating_alltime,
  }[timeframe]

  const yelpScore = restaurant.yelp_rating_alltime // Yelp all-time only for now

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      {/* Back */}
      <Link href="/search" className="text-sm text-gray-500 hover:text-blue-700 mb-6 inline-flex items-center gap-1">
        ← Back to search
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-6 mt-4 mb-8">
        <ScoreBadge score={currentScore} size="lg" showLabel />
        <div>
          <h1 className="text-3xl font-black text-gray-900 mb-1">{restaurant.restaurant_name}</h1>
          <p className="text-gray-500 text-lg">{restaurant.city}, {restaurant.state}</p>
          {restaurant.yelp_url && (
            <a
              href={restaurant.yelp_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-2 text-sm text-red-600 hover:underline"
            >
              View on Yelp →
            </a>
          )}
        </div>
      </div>

      {/* Timeframe tabs */}
      <div className="mb-8">
        <TimeframeTabs active={timeframe} onChange={setTimeframe} />
      </div>

      {/* Score breakdown */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-6">Score Breakdown</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <ScoreRing
            score={currentScore}
            label="Combined Score"
            subLabel="Google 40% + Yelp 35%"
          />
          <ScoreRing
            score={googleScore}
            label="Google"
            subLabel={`${restaurant.google_review_count?.toLocaleString() ?? '?'} reviews`}
          />
          <ScoreRing
            score={yelpScore}
            label="Yelp"
            subLabel={`${restaurant.yelp_review_count?.toLocaleString() ?? '?'} reviews`}
          />
          <ScoreRing
            score={null}
            label="Facebook"
            subLabel="N/A (deprecated)"
          />
        </div>
      </div>

      {/* All time periods */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">All Time Periods</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-sm font-medium text-gray-700">🕐 Recent Score (90 days)</span>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400">Google: {formatScore(restaurant.google_rating_90d)}</span>
              <ScoreBadge score={restaurant.combined_score_90d} size="sm" />
            </div>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-sm font-medium text-gray-700">📅 6-Month Score</span>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400">Google: {formatScore(restaurant.google_rating_365d)}</span>
              <ScoreBadge score={restaurant.combined_score_365d} size="sm" />
            </div>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm font-medium text-gray-700">⭐ All-Time Score</span>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400">Google: {formatScore(restaurant.google_rating_alltime)}</span>
              <ScoreBadge score={restaurant.combined_score_alltime} size="sm" />
            </div>
          </div>
        </div>
      </div>

      {/* Formula */}
      <div className="bg-blue-50 rounded-2xl border border-blue-100 p-6 mb-6">
        <h2 className="text-lg font-bold text-blue-900 mb-3">📊 How We Calculate</h2>
        <div className="grid grid-cols-3 gap-4 text-center mb-4">
          <div>
            <div className="text-2xl font-black text-blue-700">40%</div>
            <div className="text-sm text-blue-800">Google</div>
          </div>
          <div>
            <div className="text-2xl font-black text-blue-700">35%</div>
            <div className="text-sm text-blue-800">Yelp</div>
          </div>
          <div>
            <div className="text-2xl font-black text-gray-400">25%</div>
            <div className="text-sm text-gray-400">Facebook (N/A)</div>
          </div>
        </div>
        <p className="text-sm text-blue-700">
          When Facebook data is unavailable, Google and Yelp are weighted proportionally (53% / 47%).
        </p>
      </div>

      {/* SkipATip CTA */}
      <div className="bg-green-50 rounded-2xl border border-green-200 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-green-900 mb-1">💚 Does this place have a tip screen?</h3>
          <p className="text-sm text-green-700">Find out on SkipATip — the database of tip-free and tip-optional restaurants.</p>
        </div>
        <Link
          href={`https://skipatip.com/restaurants/${restaurant.restaurant_slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-green-700 transition-colors"
        >
          Check SkipATip →
        </Link>
      </div>

      {/* Freshness */}
      {restaurant.fetched_at && (
        <p className="text-xs text-gray-400 mt-6 text-center">
          Data last updated: {new Date(restaurant.fetched_at).toLocaleDateString()}
        </p>
      )}
    </main>
  )
}
