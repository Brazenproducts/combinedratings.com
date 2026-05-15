'use client'

import { ScoreTimeframe } from '@/lib/utils'

type TimeframeTabsProps = {
  active: ScoreTimeframe
  onChange: (t: ScoreTimeframe) => void
}

const TABS: { value: ScoreTimeframe; label: string; icon: string }[] = [
  { value: '90d', label: 'Last 30 Days', icon: '🕐' },
  { value: '365d', label: '6-Month', icon: '📅' },
  { value: 'alltime', label: 'All Time', icon: '⭐' },
]

export function TimeframeTabs({ active, onChange }: TimeframeTabsProps) {
  return (
    <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
      {TABS.map(tab => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
            active === tab.value
              ? 'bg-white text-blue-700 shadow-sm'
              : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          <span>{tab.icon}</span>
          <span className="hidden sm:inline">{tab.label}</span>
          <span className="sm:hidden">{tab.value === '90d' ? '90d' : tab.value === '365d' ? '1yr' : 'All'}</span>
        </button>
      ))}
    </div>
  )
}
