import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-24 text-center">
      <div className="text-7xl font-black text-gray-200 mb-4">404</div>
      <h1 className="text-3xl font-black text-gray-900 mb-3">Page Not Found</h1>
      <p className="text-gray-500 mb-8 text-lg">
        The restaurant or page you&apos;re looking for doesn&apos;t exist (yet). Try searching for it!
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/"
          className="px-6 py-3 bg-blue-700 text-white rounded-xl font-bold hover:bg-blue-800 transition-colors"
        >
          ← Go Home
        </Link>
        <Link
          href="/search"
          className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors"
        >
          Search Restaurants
        </Link>
      </div>
    </main>
  )
}
