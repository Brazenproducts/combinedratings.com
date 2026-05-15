import { supabase } from '@/lib/supabase'
import { parseCityStateSlug } from '@/lib/utils'
import { notFound } from 'next/navigation'
import { CityContent } from './CityContent'
import type { Metadata } from 'next'
import Link from 'next/link'

type Props = {
  params: { citystate: string }
}

async function getCityRestaurants(city: string, state: string) {
  const { data, error } = await supabase
    .from('recent_ratings')
    .select('*')
    .ilike('city', city)
    .ilike('state', state)
    .order('combined_score_90d', { ascending: false })

  if (error) return []
  return data || []
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const parsed = parseCityStateSlug(params.citystate)
  if (!parsed) return { title: 'City Not Found' }
  return {
    title: `Best Restaurants in ${parsed.city}, ${parsed.state} — Combined Ratings`,
    description: `Top-rated restaurants in ${parsed.city}, ${parsed.state} based on combined Google + Yelp scores. Time-filtered ratings.`,
  }
}

export default async function CityPage({ params }: Props) {
  const parsed = parseCityStateSlug(params.citystate)
  if (!parsed) notFound()

  const { city, state } = parsed
  const restaurants = await getCityRestaurants(city, state)

  if (restaurants.length === 0) {
    return (
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="text-5xl mb-4">🏙️</div>
        <h1 className="text-3xl font-black text-gray-900 mb-3">{city}, {state}</h1>
        <p className="text-gray-500 mb-6">No restaurants found yet for this city. Data is being added regularly.</p>
        <Link href="/" className="text-blue-700 font-semibold hover:underline">← Back to home</Link>
      </main>
    )
  }

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-2">
        <Link href="/" className="text-sm text-gray-500 hover:text-blue-700">← All cities</Link>
      </div>
      <h1 className="text-3xl font-black text-gray-900 mt-4 mb-2">
        Best Restaurants in {city}, {state}
      </h1>
      <p className="text-gray-500 mb-8">
        {restaurants.length} restaurant{restaurants.length !== 1 ? 's' : ''} with combined Google + Yelp scores
      </p>
      <CityContent restaurants={restaurants} />
    </main>
  )
}
