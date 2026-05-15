import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import { RestaurantDetail } from './RestaurantDetail'
import type { Metadata } from 'next'

type Props = {
  params: { slug: string }
}

async function getRestaurant(slug: string) {
  const { data, error } = await supabase
    .from('recent_ratings')
    .select('*')
    .eq('restaurant_slug', slug)
    .single()

  if (error || !data) return null
  return data
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const restaurant = await getRestaurant(params.slug)
  if (!restaurant) return { title: 'Restaurant Not Found' }

  return {
    title: `${restaurant.restaurant_name} — Combined Ratings`,
    description: `See combined Google + Yelp scores for ${restaurant.restaurant_name} in ${restaurant.city}, ${restaurant.state}. Time-filtered ratings you can trust.`,
  }
}

export default async function RestaurantPage({ params }: Props) {
  const restaurant = await getRestaurant(params.slug)
  if (!restaurant) notFound()

  return <RestaurantDetail restaurant={restaurant} />
}
