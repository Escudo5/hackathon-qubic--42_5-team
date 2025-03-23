"use client"

import type { CryptoCurrency } from "@/lib/currency-utils"

export interface MilestonePreviewItem {
  id: string
  title: string
  amount: number
  dueDate?: string
  status?: "pending" | "in-progress" | "completed" | "verified"
}

interface MilestonePreviewProps {
  milestones: MilestonePreviewItem[]
  activeCurrency: CryptoCurrency
}

export function MilestonePreview({ milestones, activeCurrency }: MilestonePreviewProps) {
  if (!milestones || milestones.length === 0) {
    return null
  }

  const completedMilestones = milestones.filter((m) => m.status === "verified").length
  const totalMilestones = milestones.length
  const progressPercentage = Math.round((completedMilestones / totalMilestones) * 100) || 0

  return (
    <div className="space-y-2 mt-3">
      <div className="flex justify-between items-center text-xs text-muted-foreground">
        <div>Project Milestones</div>
        <div>
          {completedMilestones}/{totalMilestones} completed
        </div>
      </div>

      <div className="relative h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-green-500 rounded-full"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex -space-x-1">
          {milestones.slice(0, 3).map((milestone, index) => (
            <div
              key={milestone.id}
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs border-2 ${
                milestone.status === "verified"
                  ? "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300"
                  : milestone.status === "completed"
                    ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300"
                    : milestone.status === "in-progress"
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                      : "border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300"
              }`}
            >
              {index + 1}
            </div>
          ))}

          {milestones.length > 3 && (
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs border-2 border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300">
              +{milestones.length - 3}
            </div>
          )}
        </div>

        <div className="text-xs text-muted-foreground">{progressPercentage}% complete</div>
      </div>
    </div>
  )
}

