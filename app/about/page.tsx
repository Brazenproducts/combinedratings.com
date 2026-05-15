import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About — Combined Ratings',
  description: 'How CombinedRatings works: we aggregate Google + Yelp scores and filter by time so you can see if a restaurant is great today.',
}

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-4xl font-black text-gray-900 mb-4">About CombinedRatings</h1>
      <p className="text-xl text-gray-500 mb-12">Why we built it, how it works, and why it&apos;s different.</p>

      {/* Why */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">The Problem With Ratings Today</h2>
        <div className="prose text-gray-600 space-y-4">
          <p>
            Google shows you a 4.2-star restaurant. But is that based on reviews from this year, or 2016? You have no idea.
            A place could have completely changed hands, fired its chef, or had a health code violation — and its overall
            rating would barely budge because of all those old reviews dragging the average.
          </p>
          <p>
            Yelp has the same problem. A restaurant that was great five years ago but is now mediocre still shows a 4.3
            because reviewers from 2019 are still there pulling the number up.
          </p>
          <p>
            <strong className="text-gray-900">CombinedRatings fixes this.</strong> We show you the score for just the last
            90 days, last year, or all time — your choice. So you can see what people think <em>right now</em>.
          </p>
        </div>
      </section>

      {/* Formula */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">The Formula</h2>
        <div className="bg-blue-50 rounded-2xl border border-blue-100 p-6 mb-6">
          <div className="grid grid-cols-3 gap-4 text-center mb-4">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="text-3xl font-black text-blue-700">40%</div>
              <div className="font-bold text-gray-800">Google</div>
              <div className="text-xs text-gray-500 mt-1">Time-filtered when available</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="text-3xl font-black text-blue-700">35%</div>
              <div className="font-bold text-gray-800">Yelp</div>
              <div className="text-xs text-gray-500 mt-1">Overall rating</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm opacity-60">
              <div className="text-3xl font-black text-gray-400">25%</div>
              <div className="font-bold text-gray-600">Facebook</div>
              <div className="text-xs text-gray-400 mt-1">Deprecated — N/A</div>
            </div>
          </div>
          <p className="text-sm text-blue-700 text-center">
            When Facebook data is unavailable, Google and Yelp are weighted proportionally: ~53% Google / ~47% Yelp.
          </p>
        </div>
        <div className="space-y-4 text-gray-600">
          <div className="flex gap-3">
            <span className="text-2xl">🕐</span>
            <div>
              <strong className="text-gray-900">Recent Score (90 days):</strong> Uses Google&apos;s last 90 days of reviews
              + Yelp&apos;s overall score. Best for answering &quot;is this place good <em>right now</em>?&quot;
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-2xl">📅</span>
            <div>
              <strong className="text-gray-900">6-Month Score:</strong> Uses Google&apos;s last year of reviews
              (closest match). Good for seeing recent-ish trends.
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-2xl">⭐</span>
            <div>
              <strong className="text-gray-900">All-Time Score:</strong> Standard weighted average of Google and Yelp
              all-time ratings. The classic number, but now from two sources.
            </div>
          </div>
        </div>
      </section>

      {/* How it&apos;s different */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How We&apos;re Different</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-3 rounded-tl-lg font-bold text-gray-700">Feature</th>
                <th className="text-center p-3 font-bold text-gray-700">Google</th>
                <th className="text-center p-3 font-bold text-gray-700">Yelp</th>
                <th className="text-center p-3 rounded-tr-lg font-bold text-blue-700">CombinedRatings</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Time-filtered scores', '❌', '❌', '✅'],
                ['Multi-platform aggregation', '❌', '❌', '✅'],
                ['Recent trend visible', '❌', '❌', '✅'],
                ['Single score (no hunting)', '✅', '✅', '✅'],
                ['Free to use', '✅', '✅', '✅'],
              ].map(([feature, g, y, cr]) => (
                <tr key={feature as string} className="border-b border-gray-100">
                  <td className="p-3 font-medium text-gray-700">{feature}</td>
                  <td className="p-3 text-center">{g}</td>
                  <td className="p-3 text-center">{y}</td>
                  <td className="p-3 text-center text-blue-700 font-semibold">{cr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* SkipATip */}
      <section className="bg-green-50 rounded-2xl border border-green-200 p-6 mb-8">
        <h2 className="text-xl font-bold text-green-900 mb-3">💚 From the Same Team: SkipATip</h2>
        <p className="text-green-800 mb-4">
          We also built SkipATip — a database of restaurants that <em>don&apos;t</em> have tip screens. Because great food
          shouldn&apos;t come with a guilt trip.
        </p>
        <Link
          href="https://skipatip.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-green-700 transition-colors"
        >
          Visit SkipATip →
        </Link>
      </section>

      <div className="text-center">
        <Link href="/" className="text-blue-700 font-semibold hover:underline">← Back to CombinedRatings</Link>
      </div>
    </main>
  )
}
