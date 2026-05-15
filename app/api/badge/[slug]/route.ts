import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params
  const supabase = createServiceClient()

  // Get rating data
  const { data: rating } = await supabase
    .from('recent_ratings')
    .select('restaurant_name, city, state, google_rating_alltime, combined_score_alltime, combined_score_365d, combined_score_90d')
    .eq('restaurant_slug', slug)
    .single()

  // Get preferred timeframe for paid listings
  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('preferred_timeframe, is_certified, is_featured')
    .eq('slug', slug)
    .single()

  if (!rating) {
    return new NextResponse('/* Restaurant not found */', {
      headers: { 'Content-Type': 'application/javascript' }
    })
  }

  const timeframe = (restaurant?.is_certified || restaurant?.is_featured)
    ? (restaurant?.preferred_timeframe ?? 'alltime')
    : 'alltime'

  const score = timeframe === '90d'
    ? rating.combined_score_90d
    : timeframe === '365d'
    ? rating.combined_score_365d
    : rating.combined_score_alltime

  const timeframeLabel: Record<string, string> = {
    '90d': 'Last 90 Days',
    '365d': 'Last Year',
    'alltime': 'All Time',
  }

  const label = timeframeLabel[timeframe] ?? 'All Time'
  const scoreDisplay = score ? score.toFixed(1) : rating.google_rating_alltime?.toFixed(1) ?? '—'
  const name = rating.restaurant_name ?? 'This restaurant'
  const url = `https://combinedratings.com/r/${slug}`

  const stars = score
    ? '★'.repeat(Math.round(score)) + '☆'.repeat(5 - Math.round(score))
    : '★★★★★'

  const color = !score ? '#6b7280'
    : score >= 4.5 ? '#16a34a'
    : score >= 4.0 ? '#1d4ed8'
    : score >= 3.5 ? '#d97706'
    : '#dc2626'

  const js = `
(function() {
  var el = document.getElementById('cr-badge-${slug}');
  if (!el) return;
  el.innerHTML = [
    '<a href="${url}" target="_blank" rel="noopener" style="',
      'display:inline-flex;align-items:center;gap:10px;',
      'background:#fff;border:2px solid ${color};border-radius:12px;',
      'padding:10px 16px;text-decoration:none;font-family:sans-serif;',
      'box-shadow:0 2px 8px rgba(0,0,0,0.08);max-width:300px;',
    '">',
      '<div style="text-align:center;min-width:48px;">',
        '<div style="font-size:26px;font-weight:900;color:${color};line-height:1;">${scoreDisplay}</div>',
        '<div style="font-size:11px;color:${color};font-weight:600;">/ 5.0</div>',
      '</div>',
      '<div>',
        '<div style="font-size:13px;font-weight:700;color:#111;line-height:1.2;">${name}</div>',
        '<div style="font-size:12px;color:${color};margin-top:2px;">${stars}</div>',
        '<div style="font-size:10px;color:#6b7280;margin-top:3px;">${label} · CombinedRatings.com</div>',
      '</div>',
    '</a>'
  ].join('');
})();
`.trim()

  return new NextResponse(js, {
    headers: {
      'Content-Type': 'application/javascript',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      'Access-Control-Allow-Origin': '*',
    }
  })
}
