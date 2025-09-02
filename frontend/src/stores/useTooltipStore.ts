'use client'
import { create } from 'zustand'

export type TooltipData = {
    title: string
    position: string
    sticky: boolean
    stepId?: number
    milestoneId?: number
    goalId?: number
}

interface TooltipDataStore {
    tooltipData: TooltipData
    setTooltipData: (updater: TooltipData | ((prev: TooltipData) => TooltipData)) => void
  }
  
  export const useTooltipDataStore = create<TooltipDataStore>((set) => ({
    tooltipData: { title: "", position: "", sticky: false },
    setTooltipData: (updater) =>
      set((state) => ({
        tooltipData:
          typeof updater === "function" ? updater(state.tooltipData) : updater,
      })),
  }));
  