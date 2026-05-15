'use client'

import { useState } from 'react'
import Link from 'next/link'
import { RestaurantCard } from '@/components/RestaurantCard'
import { TimeframeTabs } from '@/components/TimeframeTabs'
import { ScoreTimeframe, cityStateSlug } from '@/lib/utils'
import { RecentRating } from '@/lib/supabase'

type Props = {
  topRated: RecentRating[]
  isEmpty: boolean
  cities: { city: string; state: string }[]
}

export function HomepageContent({ topRated, isEmpty, cities }: Props) {
  const [timeframe, setTimeframe] = useState<ScoreTimeframe>('90d')

  if (isEmpty) {
    return (
      <section className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-6">🍽️</div>
        <h2 className="text-3xl font-black text-gray-900 mb-4">Data is Loading In</h2>
        <p className="text-gray-500 mb-8 text-lg max-w-xl mx-auto">
          We&apos;re currently aggregating restaurant data. Be the first to search your city — results will appear as data comes in.
        </p>
        <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100 max-w-md mx-auto">
          <p className="text-blue-800 font-semibold text-lg mb-2">🚀 Coming Soon</p>
          <p className="text-blue-700 text-sm">Cities being added now. Check back soon!</p>
        </div>
      </section>
    )
  }

  return (
    <>
      {/* Top Rated Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-2xl font-black text-gray-900">🏆 Top Rated Right Now</h2>
          <TimeframeTabs active={timeframe} onChange={setTimeframe} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topRated.map(r => (
            <RestaurantCard key={r.restaurant_slug} restaurant={r} timeframe={timeframe} />
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link href="/search" className="inline-flex items-center gap-2 text-blue-700 font-semibold hover:underline">
            Search all restaurants →
          </Link>
        </div>
      </section>

      {/* Cities Section */}
      {cities.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-12">
          <h2 className="text-2xl font-black text-gray-900 mb-6">🏙️ Browse by City</h2>
          <div className="flex flex-wrap gap-3">
            {cities.map(c => (
              <Link
                key={`${c.city}-${c.state}`}
                href={`/city/${cityStateSlug(c.city, c.state)}`}
                className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:border-blue-400 hover:text-blue-700 transition-colors"
              >
                {c.city}, {c.state}
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  )
}
