import { supabase } from '@/lib/supabase'
import { SearchBar } from '@/components/SearchBar'
import { SearchResults } from './SearchResults'

type SearchPageProps = {
  searchParams: { q?: string; city?: string }
}

async function searchRestaurants(q: string, city: string) {
  let query = supabase.from('recent_ratings').select('*')

  if (q) {
    query = query.ilike('restaurant_name', `%${q}%`)
  }
  if (city) {
    query = query.ilike('city', `%${city}%`)
  }

  const { data, error } = await query.limit(50)
  if (error) return []
  return data || []
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const q = searchParams.q || ''
  const city = searchParams.city || ''
  const hasSearch = q || city

  const results = hasSearch ? await searchRestaurants(q, city) : []

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-black text-gray-900 mb-6">
        {hasSearch ? 'Search Results' : 'Search Restaurants'}
      </h1>

      <div className="mb-8">
        <SearchBar initialQuery={q} initialCity={city} />
      </div>

      {hasSearch && (
        <p className="text-sm text-gray-500 mb-6">
          {results.length === 0
            ? 'No results found.'
            : `${results.length} result${results.length !== 1 ? 's' : ''} for "${[q, city].filter(Boolean).join(', ')}"`}
        </p>
      )}

      {!hasSearch && (
        <div className="text-center py-16 text-gray-400">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-lg">Enter a restaurant name or city to search</p>
        </div>
      )}

      {hasSearch && results.length > 0 && (
        <SearchResults results={results} />
      )}

      {hasSearch && results.length === 0 && (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">😕</div>
          <h2 className="text-xl font-bold text-gray-700 mb-2">No results found</h2>
          <p className="text-gray-500 mb-6">Try a different name or city.</p>
          <a href="/" className="text-blue-700 font-semibold hover:underline">← Back to home</a>
        </div>
      )}
    </main>
  )
}
