'use client'

import { create } from "zustand"
import { immer } from "zustand/middleware/immer"

export type TasksDataAggregated = {
    [taskId: number]: { 
        description: string
        points: number
        ms: number
        endTime: string
        isSolved: number | null
        stepId: number
        milestoneId: number
        goalId: number
    }
}

interface TasksStore {
    tasks: TasksDataAggregated
    loadTasks: () => Promise<void>
    setTasks: (fn: (tasks: TasksDataAggregated) => void) => void;}

    export const useTasksStore = create<TasksStore>()(
        immer((set) => ({
          tasks: {},
          loadTasks: async () => {
            const tasksData = await window.electronAPI.getTasks()
            const tasksDataAggregated = tasksData.reduce<TasksDataAggregated>((acc, row) => {
              acc[row.id] = {
                description: row.description,
                points: row.points,
                ms: row.ms,
                endTime: row.end_time,
                isSolved: row.is_solved,
                stepId: row.step_id,
                milestoneId: 0,
                goalId: 0,
              }
              return acc
            }, {})
            set({ tasks: tasksDataAggregated })
          },
          setTasks: (fn) =>
            set((state) => {
              fn(state.tasks)
            }),
        }))
      )