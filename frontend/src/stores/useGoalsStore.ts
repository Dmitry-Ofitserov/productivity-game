'use client'

import { create } from 'zustand'
import type { TasksDataAggregated } from './useTasksStore'

export type StepData = {
    id: number
    description: string
    points: number
    hours: number
}

export type MilestoneDataAggregated = {
    id: number
    description: string
    points: number
    hours: number
    steps: StepData[]
}

export type GoalDataAggregated = {
    id: number
    title: string
    currentLevel: number
    color: string
    points: number
    hours: number
    milestones: MilestoneDataAggregated[]
}

interface GoalsStore {
    goals: GoalDataAggregated[]
    loadGoals: (tasks: TasksDataAggregated) => Promise<void>
    setGoals: (updater: GoalDataAggregated[] | ((state: GoalDataAggregated[]) => GoalDataAggregated[])) => void
}

export const useGoalsStore = create<GoalsStore>((set) => ({
    goals: [],
    
    loadGoals: async (tasks) => {
        const goalsData = await window.electronAPI.getGoals();
        const milestonesData = await window.electronAPI.getMilestones();
        const stepsData = await window.electronAPI.getSteps();

        let goalsDataAggregated = goalsData.reduce<GoalDataAggregated[]>((goalsAcc, rowGoal) => {
            goalsAcc[rowGoal.position] = {
                id: rowGoal.id,
                title: rowGoal.title,
                currentLevel: rowGoal.current_level,
                color: rowGoal.color,
                points: 0,
                hours: 0,
                milestones: milestonesData.reduce<MilestoneDataAggregated[]>((milestonesAcc, rowMilestone) => {
                    if (rowMilestone.goal_id === rowGoal.id)
                    milestonesAcc[rowMilestone.position] = {
                        id: rowMilestone.id,
                        description: rowMilestone.description,
                        points: 0,
                        hours: 0,
                        steps: stepsData.reduce<StepData[]>((stepsAcc, rowSteps) => {
                            if (rowSteps.milestone_id === rowMilestone.id)
                                stepsAcc[rowSteps.position] = {
                                    id: rowSteps.id,
                                    description: rowSteps.description,
                                    points: 0,
                                    hours: 0
                                }
                            return stepsAcc
                        }, []).concat({
                            id: 0,
                            description: "milestone",
                            points: 0,
                            hours: 0,
                        })
                    }
                    return milestonesAcc
                }, [])
                }
                return goalsAcc
          }, [])
      
          // update aggregates with tasks
          for (let goal of goalsDataAggregated) {
            for (let milestone of goal.milestones) {
                for (let step of milestone.steps) {
                    Object.values(tasks).forEach((task) => {
                    if (task.stepId === step?.id) {
                        task.goalId = goal.id
                        task.milestoneId = milestone.id
                        if (task.isSolved) {
                            step.hours += task.hours
                            step.points += task.points
                        }
                    }
                    })
                    milestone.hours += step.hours
                    milestone.points += step.points
                }
                goal.hours += milestone.hours
                goal.points += milestone.points
            }
          }
      
        set({ goals: goalsDataAggregated })
    },
    setGoals: (updater) =>
        set((state) => ({goals: typeof updater === "function" ? updater(state.goals) : updater})),
}))