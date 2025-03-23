"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CryptoIcon } from "@/components/crypto-icon"
import { type CryptoCurrency, CURRENCIES, formatPrice } from "@/lib/currency-utils"
import { CheckCircle, Clock, AlertCircle, Lock, Unlock, ExternalLink } from "lucide-react"
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

interface MilestoneTrackerProps {
  milestones: Milestone[]
  projectId: string
  isProvider: boolean
  onMilestoneAction: (milestoneId: string, action: "start" | "complete" | "verify") => Promise<void>
  activeCurrency: CryptoCurrency
}

export function MilestoneTracker({
  milestones,
  projectId,
  isProvider,
  onMilestoneAction,
  activeCurrency,
}: MilestoneTrackerProps) {
  const [loading, setLoading] = useState<string | null>(null)
  const { toast } = useToast()

  // Calculate progress
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
            Completed & Verified
          </Badge>
        )
    }
  }

  const getStatusIcon = (status: Milestone["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="h-5 w-5 text-gray-500" />
      case "in-progress":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "completed":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      case "verified":
        return <CheckCircle className="h-5 w-5 text-green-500" />
    }
  }

  return (
    <Card className="border-green-100 dark:border-gray-800">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl text-green-700 dark:text-green-300">Project Milestones</CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Progress:</span>
            <span className="font-medium">{progressPercentage}%</span>
          </div>
        </div>
        <Progress value={progressPercentage} className="h-2 mt-2" />
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          {milestones.map((milestone, index) => (
            <Card key={milestone.id} className="border-green-100 dark:border-gray-800 overflow-hidden">
              <div
                className={`h-1 ${milestone.status === "verified" ? "bg-green-500" : milestone.status === "completed" ? "bg-yellow-500" : milestone.status === "in-progress" ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-700"}`}
              ></div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-medium">
                      {index + 1}
                    </div>
                    <h3 className="font-medium">{milestone.title}</h3>
                    {getStatusBadge(milestone.status)}
                  </div>
                  <div className="flex items-center gap-1">
                    <CryptoIcon currency={activeCurrency} className={CURRENCIES[activeCurrency].color} />
                    <span className="font-medium">{formatPrice(milestone.amount, activeCurrency)}</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-3">{milestone.description}</p>

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(milestone.status)}
                    <div className="text-sm">
                      {milestone.status === "verified" ? (
                        <span className="text-green-600 dark:text-green-400">
                          Completed on {milestone.completedDate}
                        </span>
                      ) : milestone.status === "completed" ? (
                        <span className="text-yellow-600 dark:text-yellow-400">Awaiting verification</span>
                      ) : milestone.status === "in-progress" ? (
                        <span className="text-blue-600 dark:text-blue-400">Due by {milestone.dueDate}</span>
                      ) : (
                        <span className="text-gray-600 dark:text-gray-400">Not started yet</span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {milestone.transactionHash && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 gap-1 text-xs"
                        onClick={() => window.open(`https://etherscan.io/tx/${milestone.transactionHash}`, "_blank")}
                      >
                        <ExternalLink className="h-3 w-3" />
                        View Transaction
                      </Button>
                    )}

                    {isProvider ? (
                      // Provider actions
                      <>
                        {milestone.status === "pending" && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 gap-1 text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                            onClick={() => handleMilestoneAction(milestone, "start")}
                            disabled={!!loading}
                          >
                            {loading === `start-${milestone.id}` ? (
                              <div className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                            ) : (
                              <Clock className="h-3 w-3" />
                            )}
                            Start Work
                          </Button>
                        )}

                        {milestone.status === "in-progress" && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 gap-1 text-xs bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800 hover:bg-yellow-100 dark:hover:bg-yellow-900/30"
                            onClick={() => handleMilestoneAction(milestone, "complete")}
                            disabled={!!loading}
                          >
                            {loading === `complete-${milestone.id}` ? (
                              <div className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                            ) : (
                              <CheckCircle className="h-3 w-3" />
                            )}
                            Mark Complete
                          </Button>
                        )}
                      </>
                    ) : (
                      // Client actions
                      <>
                        {milestone.status === "completed" && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 gap-1 text-xs bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/30"
                            onClick={() => handleMilestoneAction(milestone, "verify")}
                            disabled={!!loading}
                          >
                            {loading === `verify-${milestone.id}` ? (
                              <div className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                            ) : (
                              <Unlock className="h-3 w-3" />
                            )}
                            Verify & Release Payment
                          </Button>
                        )}

                        {(milestone.status === "pending" || milestone.status === "in-progress") && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Lock className="h-3 w-3" />
                            <span>Payment locked in escrow</span>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

