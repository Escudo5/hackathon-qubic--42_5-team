"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { CryptoIcon } from "@/components/crypto-icon"
import { type CryptoCurrency, CURRENCIES } from "@/lib/currency-utils"
import { Plus, Trash2, GripVertical, Calendar } from "lucide-react"
import { v4 as uuidv4 } from "uuid"

export interface MilestoneInput {
  id: string
  title: string
  description: string
  amount: number
  dueDate?: string
}

interface MilestoneEditorProps {
  milestones: MilestoneInput[]
  onChange: (milestones: MilestoneInput[]) => void
  currency: CryptoCurrency
  totalBudget: number
}

export function MilestoneEditor({ milestones, onChange, currency, totalBudget }: MilestoneEditorProps) {
  const addMilestone = () => {
    const newMilestone: MilestoneInput = {
      id: uuidv4(),
      title: "",
      description: "",
      amount: 0,
    }
    onChange([...milestones, newMilestone])
  }

  const removeMilestone = (id: string) => {
    onChange(milestones.filter((m) => m.id !== id))
  }

  const updateMilestone = (id: string, field: keyof MilestoneInput, value: any) => {
    onChange(
      milestones.map((m) =>
        m.id === id ? { ...m, [field]: field === "amount" ? Number.parseFloat(value) || 0 : value } : m,
      ),
    )
  }

  // Calculate total amount and remaining budget
  const totalAllocated = milestones.reduce((sum, m) => sum + m.amount, 0)
  const remaining = totalBudget - totalAllocated

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Project Milestones</h3>
        <div className="text-sm">
          <span className="text-muted-foreground">Remaining budget: </span>
          <span className={`font-medium ${remaining < 0 ? "text-red-500" : ""}`}>
            {remaining.toFixed(2)} {CURRENCIES[currency].symbol}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {milestones.map((milestone, index) => (
          <Card key={milestone.id} className="border-green-100 dark:border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-medium">
                  {index + 1}
                </div>
                <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                <Input
                  placeholder="Milestone title"
                  value={milestone.title}
                  onChange={(e) => updateMilestone(milestone.id, "title", e.target.value)}
                  className="flex-1 glass-input"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeMilestone(milestone.id)}
                  className="h-8 w-8 text-muted-foreground hover:text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                <div className="md:col-span-2">
                  <Textarea
                    placeholder="Describe what will be delivered in this milestone"
                    value={milestone.description}
                    onChange={(e) => updateMilestone(milestone.id, "description", e.target.value)}
                    className="h-20 glass-input"
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor={`amount-${milestone.id}`} className="text-xs text-muted-foreground mb-1 block">
                      Payment Amount
                    </Label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <CryptoIcon currency={currency} className={CURRENCIES[currency].color} size="sm" />
                      </div>
                      <Input
                        id={`amount-${milestone.id}`}
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        value={milestone.amount || ""}
                        onChange={(e) => updateMilestone(milestone.id, "amount", e.target.value)}
                        className="pl-9 glass-input"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor={`duedate-${milestone.id}`} className="text-xs text-muted-foreground mb-1 block">
                      Expected Completion
                    </Label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <Input
                        id={`duedate-${milestone.id}`}
                        type="date"
                        value={milestone.dueDate || ""}
                        onChange={(e) => updateMilestone(milestone.id, "dueDate", e.target.value)}
                        className="pl-9 glass-input"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button
        variant="outline"
        onClick={addMilestone}
        className="w-full border-dashed border-2 border-green-200 dark:border-green-800 hover:border-green-300 dark:hover:border-green-700 bg-transparent hover:bg-green-50 dark:hover:bg-green-900/20 text-green-700 dark:text-green-300"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Milestone
      </Button>

      {remaining < 0 && (
        <p className="text-sm text-red-500">
          Warning: You've allocated more than your total budget. Please adjust your milestone amounts.
        </p>
      )}
    </div>
  )
}

