import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Combined Ratings — Real Restaurant Scores, Right Now',
  description: 'The only restaurant rating that tells you what people think RIGHT NOW. We combine Google + Yelp ratings filtered by time.',
  keywords: 'restaurant ratings, combined scores, google yelp rating, best restaurants near me',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-black text-blue-700 tracking-tight">Combined<span className="text-gray-800">Ratings</span></span>
              <span className="hidden sm:inline text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-semibold">BETA</span>
            </Link>
            <div className="flex items-center gap-4 text-sm font-medium">
              <Link href="/about" className="text-gray-600 hover:text-blue-700 transition-colors">About</Link>
              <Link href="https://skipatip.com" target="_blank" className="text-gray-600 hover:text-green-600 transition-colors">💚 SkipATip</Link>
            </div>
          </div>
        </nav>

        {children}

        <footer className="bg-gray-900 text-gray-300 mt-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div>
                <h3 className="text-white font-bold text-lg mb-3">CombinedRatings</h3>
                <p className="text-sm leading-relaxed">The only restaurant rating that tells you what people think <em>right now</em>. Google + Yelp, time-filtered.</p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-3">Explore</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                  <li><Link href="/about" className="hover:text-white transition-colors">How It Works</Link></li>
                  <li><Link href="/search" className="hover:text-white transition-colors">Search Restaurants</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-3">From the same team</h4>
                <a href="https://skipatip.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                  💚 Looking for tip-free restaurants? Visit SkipATip →
                </a>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-6 text-center text-xs text-gray-500">
              © {new Date().getFullYear()} CombinedRatings.com — Not affiliated with Google or Yelp.
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
