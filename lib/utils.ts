export type ScoreTimeframe = '90d' | '365d' | 'alltime'

export function getScore(restaurant: {
  combined_score_90d: number | null
  combined_score_365d: number | null
  combined_score_alltime: number | null
}, timeframe: ScoreTimeframe): number | null {
  switch (timeframe) {
    case '90d': return restaurant.combined_score_90d
    case '365d': return restaurant.combined_score_365d
    case 'alltime': return restaurant.combined_score_alltime
  }
}

export function getScoreColor(score: number | null): string {
  if (score === null) return 'bg-gray-200 text-gray-500'
  if (score >= 4.5) return 'bg-green-500 text-white'
  if (score >= 4.0) return 'bg-blue-600 text-white'
  if (score >= 3.5) return 'bg-yellow-500 text-white'
  return 'bg-red-500 text-white'
}

export function getScoreBorderColor(score: number | null): string {
  if (score === null) return 'border-gray-300 text-gray-400'
  if (score >= 4.5) return 'border-green-500 text-green-600'
  if (score >= 4.0) return 'border-blue-600 text-blue-700'
  if (score >= 3.5) return 'border-yellow-500 text-yellow-600'
  return 'border-red-500 text-red-600'
}

export function getScoreLabel(score: number | null): string {
  if (score === null) return 'No data'
  if (score >= 4.5) return 'Excellent'
  if (score >= 4.0) return 'Great'
  if (score >= 3.5) return 'Good'
  return 'Fair'
}

export function formatScore(score: number | null): string {
  if (score === null) return '—'
  return score.toFixed(1)
}

export function cityStateSlug(city: string, state: string): string {
  return `${city.toLowerCase().replace(/\s+/g, '-')}-${state.toLowerCase()}`
}

export function parseCityStateSlug(slug: string): { city: string; state: string } | null {
  // Format: city-name-st (last 2 chars = state)
  const parts = slug.split('-')
  if (parts.length < 2) return null
  const state = parts[parts.length - 1].toUpperCase()
  const city = parts.slice(0, -1).map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ')
  return { city, state }
}
