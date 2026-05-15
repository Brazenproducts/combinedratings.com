import { createServiceClient } from '@/lib/supabase'
import { notFound } from 'next/navigation'

export default async function BadgePage({ params }: { params: { slug: string } }) {
  const supabase = createServiceClient()

  const { data: rating } = await supabase
    .from('recent_ratings')
    .select('restaurant_name, city, state, combined_score_alltime, combined_score_365d, combined_score_90d')
    .eq('restaurant_slug', params.slug)
    .single()

  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('preferred_timeframe, is_certified, is_featured')
    .eq('slug', params.slug)
    .single()

  if (!rating) notFound()

  const timeframe = (restaurant?.is_certified || restaurant?.is_featured)
    ? (restaurant?.preferred_timeframe ?? 'alltime')
    : 'alltime'

  const timeframeLabel: Record<string, string> = {
    '90d': 'Last 90 Days',
    '365d': 'Last Year',
    'alltime': 'All Time',
  }

  const score = timeframe === '90d'
    ? rating.combined_score_90d
    : timeframe === '365d'
    ? rating.combined_score_365d
    : rating.combined_score_alltime

  const embedCode = `<!-- CombinedRatings.com Badge for ${rating.restaurant_name} -->
<div id="cr-badge-${params.slug}"></div>
<script src="https://combinedratings.com/api/badge/${params.slug}" async></script>`

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-gray-900 mb-2">Your Rating Badge</h1>
          <p className="text-gray-500">Embed this on your website, menu, or booking page</p>
        </div>

        {/* Live preview */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 mb-6">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">Live Preview</p>
          <div className="flex items-center justify-center">
            <a
              href={`https://combinedratings.com/r/${params.slug}`}
              target="_blank"
              rel="noopener"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                background: '#fff', border: '2px solid #1d4ed8', borderRadius: '12px',
                padding: '10px 16px', textDecoration: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
              }}
            >
              <div style={{ textAlign: 'center', minWidth: '48px' }}>
                <div style={{ fontSize: '26px', fontWeight: 900, color: '#1d4ed8', lineHeight: 1 }}>
                  {score?.toFixed(1) ?? '—'}
                </div>
                <div style={{ fontSize: '11px', color: '#1d4ed8', fontWeight: 600 }}>/ 5.0</div>
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#111', lineHeight: 1.2 }}>
                  {rating.restaurant_name}
                </div>
                <div style={{ fontSize: '12px', color: '#1d4ed8', marginTop: '2px' }}>★★★★★</div>
                <div style={{ fontSize: '10px', color: '#6b7280', marginTop: '3px' }}>
                  {timeframeLabel[timeframe]} · CombinedRatings.com
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* Embed code */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-6">
          <p className="text-sm font-semibold text-gray-700 mb-3">Copy & paste this into your website:</p>
          <pre className="bg-gray-900 text-green-400 rounded-xl p-4 text-xs overflow-x-auto whitespace-pre-wrap">
            {embedCode}
          </pre>
          <p className="text-xs text-gray-400 mt-3">
            The badge updates automatically as new reviews come in. No maintenance required.
          </p>
        </div>

        {/* Timeframe info */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
          <strong>Showing:</strong> {timeframeLabel[timeframe]} score
          {(restaurant?.is_certified || restaurant?.is_featured) ? (
            <span className="ml-2 text-blue-600">✓ Featured listing</span>
          ) : (
            <span className="block mt-1 text-blue-600">
              Upgrade to a featured listing to choose your best timeframe →
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
