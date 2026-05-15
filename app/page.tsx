import { Suspense } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { SearchBar } from '@/components/SearchBar'
import { HomepageContent } from './HomepageContent'

async function getTopRated() {
  const { data, error } = await supabase
    .from('recent_ratings')
    .select('*')
    .not('combined_score_90d', 'is', null)
    .order('combined_score_90d', { ascending: false })
    .limit(6)

  if (error) return []
  return data || []
}

async function getCities() {
  const { data, error } = await supabase
    .from('recent_ratings')
    .select('city, state')
    .not('city', 'is', null)

  if (error) return []

  // Deduplicate
  const seen = new Set<string>()
  const cities: { city: string; state: string }[] = []
  for (const row of (data || [])) {
    const key = `${row.city}-${row.state}`
    if (!seen.has(key)) {
      seen.add(key)
      cities.push(row)
    }
  }
  return cities.slice(0, 12)
}

export default async function HomePage() {
  const [topRated, cities] = await Promise.all([getTopRated(), getCities()])
  const isEmpty = topRated.length === 0

  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-800 via-blue-700 to-blue-600 text-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/90 text-sm px-3 py-1.5 rounded-full mb-6 backdrop-blur-sm">
            <span>🌟</span>
            <span>Google + Yelp · Time-filtered · Actually useful</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black leading-tight text-white mb-4">
            The rating that tells you what people think{' '}
            <span className="text-yellow-300 italic">RIGHT NOW.</span>
          </h1>
          <p className="text-xl text-white/85 mb-10 max-w-2xl mx-auto">
            We combine Google and Yelp scores and filter by time — so you see if a restaurant is great today, not just in 2019.
          </p>
          <div className="max-w-2xl mx-auto">
            <SearchBar large />
          </div>
        </div>
      </section>

      {/* Main content with client-side timeframe tabs */}
      <Suspense fallback={<div className="max-w-6xl mx-auto px-4 py-12 text-center text-gray-400">Loading...</div>}>
        <HomepageContent topRated={topRated} isEmpty={isEmpty} cities={cities} />
      </Suspense>

      {/* How It Works */}
      <section className="bg-blue-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-center text-gray-900 mb-12">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">We Aggregate</h3>
              <p className="text-gray-600 text-sm">We pull Google and Yelp ratings for thousands of restaurants across the country.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">⏱️</div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">We Filter by Time</h3>
              <p className="text-gray-600 text-sm">Unlike Google or Yelp, we show you the score for just the last 90 days, 6 months, or all-time — your choice.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">You Decide</h3>
              <p className="text-gray-600 text-sm">A 4.8 this month is more meaningful than a 4.2 average from 5 years of reviews. Now you can tell the difference.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SkipATip CTA */}
      <section className="py-10 px-4 border-t border-gray-100">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-gray-600 mb-3">Also wondering about tip screens?</p>
          <Link
            href="https://skipatip.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition-colors"
          >
            💚 Find tip-free restaurants on SkipATip →
          </Link>
        </div>
      </section>
    </main>
  )
}
