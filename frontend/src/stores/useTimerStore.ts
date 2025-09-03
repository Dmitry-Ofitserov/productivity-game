'use client'
import { create } from 'zustand'
import { useTasksStore } from './useTasksStore'

interface TimerStore {
    activeTaskId: number | null
    startTime: number | null
    startTimer: (taskId: number, initialElapsed?: number) => void
    stopTimer: () => void
    tick: () => void
}

let intervalId: number | null = null

export const useTimerStore = create<TimerStore>((set, get) => ({
    activeTaskId: null,
    startTime: null,

    startTimer: (taskId) => {
    
        if (intervalId !== null) {
            clearInterval(intervalId)
            intervalId = null
            const { activeTaskId } = get();
            if (activeTaskId){
                useTasksStore.getState().setTasks((tasks) => {
                    tasks[activeTaskId].isSolved = 0
                })
            }
        }
    
        const now = Date.now();
        set({
            activeTaskId: taskId,
            startTime: now
        });
    
        intervalId = window.setInterval(() => {
            get().tick()
        }, 1000)
    },

    stopTimer: () => {
        if (intervalId !== null) {
            clearInterval(intervalId)
            intervalId = null
        }
        set({startTime: null, activeTaskId: null })
        
    },
    tick: () => {
        const { startTime, activeTaskId } = get()
        if (startTime !== null) {
            const delta = Math.floor((Date.now() - startTime));
            set({startTime: Date.now() });
            
            if (activeTaskId){
                const newTaskMs = useTasksStore.getState().tasks[activeTaskId].ms + delta;
                useTasksStore.getState().setTasks((tasks) => {
                    tasks[activeTaskId].ms = newTaskMs;
                })
                const sqlResult = window.electronAPI.updateTaskMs(activeTaskId, newTaskMs);
            }
            console.log('tick', delta);
        }

    }

}))