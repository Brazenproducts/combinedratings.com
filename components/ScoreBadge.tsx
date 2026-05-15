'use client'

import { getScoreColor, getScoreBorderColor, formatScore, getScoreLabel } from '@/lib/utils'

type ScoreBadgeProps = {
  score: number | null
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
}

export function ScoreBadge({ score, size = 'md', showLabel = false }: ScoreBadgeProps) {
  const colorClass = getScoreColor(score)
  const sizeClasses = {
    sm: 'w-12 h-12 text-sm',
    md: 'w-16 h-16 text-lg',
    lg: 'w-24 h-24 text-3xl',
  }
  const fontWeight = 'font-black'

  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`${sizeClasses[size]} ${colorClass} ${fontWeight} rounded-full flex items-center justify-center shadow-md`}>
        {formatScore(score)}
      </div>
      {showLabel && (
        <span className={`text-xs font-semibold ${score === null ? 'text-gray-400' : score >= 4.5 ? 'text-green-600' : score >= 4.0 ? 'text-blue-700' : score >= 3.5 ? 'text-yellow-600' : 'text-red-600'}`}>
          {getScoreLabel(score)}
        </span>
      )}
    </div>
  )
}

type ScoreRingProps = {
  score: number | null
  label: string
  subLabel?: string
}

export function ScoreRing({ score, label, subLabel }: ScoreRingProps) {
  const borderColor = getScoreBorderColor(score)
  const textColor = score === null
    ? 'text-gray-400'
    : score >= 4.5 ? 'text-green-600'
    : score >= 4.0 ? 'text-blue-700'
    : score >= 3.5 ? 'text-yellow-600'
    : 'text-red-600'

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`w-20 h-20 rounded-full border-4 ${borderColor} flex items-center justify-center`}>
        <span className={`text-2xl font-black ${textColor}`}>{formatScore(score)}</span>
      </div>
      <div className="text-center">
        <div className="text-sm font-semibold text-gray-700">{label}</div>
        {subLabel && <div className="text-xs text-gray-500">{subLabel}</div>}
      </div>
    </div>
  )
}
