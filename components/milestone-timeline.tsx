"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { type CryptoCurrency, formatPrice } from "@/lib/currency-utils"
import { CheckCircle, Clock, AlertCircle, Lock, Unlock, Calendar, DollarSign } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export interface Milestone {
  id: string
  title: string
  description: string
  amount: number
  currency: CryptoCurrency
  status: "pending" | "in-progress" | "completed" | "verified"
  dueDate?: string
  completedDate?: string
  transactionHash?: string
}

interface MilestoneTimelineProps {
  milestones: Milestone[]
  projectId: string
  isProvider: boolean
  onMilestoneAction: (milestoneId: string, action: "start" | "complete" | "verify") => Promise<void>
  activeCurrency: CryptoCurrency
  compact?: boolean
}

export function MilestoneTimeline({
  milestones,
  projectId,
  isProvider,
  onMilestoneAction,
  activeCurrency,
  compact = false,
}: MilestoneTimelineProps) {
  const [loading, setLoading] = useState<string | null>(null)
  const { toast } = useToast()

  const completedMilestones = milestones.filter((m) => m.status === "verified").length
  const totalMilestones = milestones.length
  const progressPercentage = Math.round((completedMilestones / totalMilestones) * 100) || 0

  const handleMilestoneAction = async (milestone: Milestone, action: "start" | "complete" | "verify") => {
    try {
      setLoading(`${action}-${milestone.id}`)
      await onMilestoneAction(milestone.id, action)

      const actionMessages = {
        start: "Milestone started successfully",
        complete: "Milestone marked as completed",
        verify: "Milestone verified and payment released",
      }

      toast({
        title: "Success",
        description: actionMessages[action],
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to process milestone action",
        variant: "destructive",
      })
    } finally {
      setLoading(null)
    }
  }

  const getStatusBadge = (status: Milestone["status"]) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
            Pending
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
            In Progress
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300">
            Awaiting Verification
          </Badge>
        )
      case "verified":
        return (
          <Badge variant="outline" className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300">
            Completed
          </Badge>
        )
    }
  }

  const getStatusIcon = (status: Milestone["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="h-5 w-5 text-gray-400 dark:text-gray-500" />
      case "in-progress":
        return <Clock className="h-5 w-5 text-blue-500 dark:text-blue-400" />
      case "completed":
        return <AlertCircle className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />
      case "verified":
        return <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />
    }
  }

  if (compact) {
    return (
      <div className="space-y-2">
        <div className="flex justify-between items-center mb-1">
          <div className="text-sm font-medium">Milestone Progress</div>
          <div className="text-sm">
            {completedMilestones}/{totalMilestones}
          </div>
        </div>
        <div className="relative h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-green-500 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="text-lg font-medium">Project Milestones</div>
          <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
            {completedMilestones}/{totalMilestones} Completed
          </Badge>
        </div>
        <div className="text-sm text-muted-foreground">Overall Progress: {progressPercentage}%</div>
      </div>

      <div className="relative">
        <div className="absolute top-4 left-4 right-4 h-1 bg-gray-200 dark:bg-gray-800 z-0">
          <div
            className="h-full bg-green-500 transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        <div className="relative z-10">
          {milestones.map((milestone, index) => (
            <div key={milestone.id} className="relative">
              <div className="flex items-start gap-4 mb-8">
                <div className="flex-shrink-0 mt-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      milestone.status === "verified"
                        ? "bg-green-500"
                        : milestone.status === "completed"
                          ? "bg-yellow-500"
                          : milestone.status === "in-progress"
                            ? "bg-blue-500"
                            : "bg-gray-300 dark:bg-gray-700"
                    }`}
                  >
                    {milestone.status === "verified" ? (
                      <CheckCircle className="h-5 w-5 text-white" />
                    ) : milestone.status === "completed" ? (
                      <AlertCircle className="h-5 w-5 text-white" />
                    ) : milestone.status === "in-progress" ? (
                      <Clock className="h-5 w-5 text-white" />
                    ) : (
                      <span className="text-white font-medium">{index + 1}</span>
                    )}
                  </div>

                  {index < milestones.length - 1 && (
                    <div
                      className={`w-0.5 h-16 mx-auto ${
                        milestone.status === "verified" ? "bg-green-500" : "bg-gray-200 dark:bg-gray-700"
                      }`}
                    ></div>
                  )}
                </div>

                <div className="flex-grow">
                  <Card
                    className={`border-l-4 ${
                      milestone.status === "verified"
                        ? "border-l-green-500"
                        : milestone.status === "completed"
                          ? "border-l-yellow-500"
                          : milestone.status === "in-progress"
                            ? "border-l-blue-500"
                            : "border-l-gray-300 dark:border-l-gray-700"
                    } border-green-100 dark:border-gray-800`}
                  >
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-lg">{milestone.title}</h3>
                          {getStatusBadge(milestone.status)}
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1 text-sm">
                            <DollarSign className="h-4 w-4 text-green-500" />
                            <span className="font-medium">{formatPrice(milestone.amount, activeCurrency)}</span>
                          </div>

                          {milestone.dueDate && (
                            <div className="flex items-center gap-1 text-sm">
                              <Calendar className="h-4 w-4 text-blue-500" />
                              <span>{new Date(milestone.dueDate).toLocaleDateString()}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-4">{milestone.description}</p>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          {milestone.status === "verified" ? (
                            <div className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
                              <CheckCircle className="h-4 w-4" />
                              <span>Completed on {milestone.completedDate}</span>
                            </div>
                          ) : milestone.status === "completed" ? (
                            <div className="flex items-center gap-1 text-sm text-yellow-600 dark:text-yellow-400">
                              <AlertCircle className="h-4 w-4" />
                              <span>Awaiting verification</span>
                            </div>
                          ) : milestone.status === "in-progress" ? (
                            <div className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400">
                              <Clock className="h-4 w-4" />
                              <span>In progress</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                              <Lock className="h-4 w-4" />
                              <span>Not started yet</span>
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2">
                          {isProvider ? (
                            <>
                              {milestone.status === "pending" && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleMilestoneAction(milestone, "start")}
                                  disabled={!!loading}
                                >
                                  {loading === `start-${milestone.id}` ? (
                                    <div className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                                  ) : (
                                    <Clock className="h-3 w-3 mr-2" />
                                  )}
                                  Start Work
                                </Button>
                              )}

                              {milestone.status === "in-progress" && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleMilestoneAction(milestone, "complete")}
                                  disabled={!!loading}
                                >
                                  {loading === `complete-${milestone.id}` ? (
                                    <div className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                                  ) : (
                                    <CheckCircle className="h-3 w-3 mr-2" />
                                  )}
                                  Mark Complete
                                </Button>
                              )}
                            </>
                          ) : (
                            <>
                              {milestone.status === "completed" && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleMilestoneAction(milestone, "verify")}
                                  disabled={!!loading}
                                >
                                  {loading === `verify-${milestone.id}` ? (
                                    <div className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                                  ) : (
                                    <Unlock className="h-3 w-3 mr-2" />
                                  )}
                                  Verify & Release Payment
                                </Button>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

