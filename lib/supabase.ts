import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side client with service role (for API routes)
export function createServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export type RecentRating = {
  restaurant_slug: string
  restaurant_name: string
  city: string
  state: string
  google_rating_alltime: number | null
  google_rating_90d: number | null
  google_rating_365d: number | null
  google_review_count: number | null
  google_review_count_90d: number | null
  yelp_rating_alltime: number | null
  yelp_review_count: number | null
  yelp_url: string | null
  combined_score_90d: number | null
  combined_score_365d: number | null
  combined_score_alltime: number | null
  fetched_at: string | null
}
