'use client'
import { create } from 'zustand'

export type KanbanDataAggregated = {
    [kanbanId: number]: number[];
}

interface KanbanStore {
    kanban: KanbanDataAggregated
    loadKanban: () => Promise<void>
    setKanban: (updater: KanbanDataAggregated | ((state: KanbanDataAggregated) => KanbanDataAggregated)) => void
}

export const useKanbanStore = create<KanbanStore>((set) => ({
    kanban: {},

    loadKanban: async () => {
        const kanbanData = await window.electronAPI.getKanban()
        const kanbanDataAggregated = kanbanData.reduce<KanbanDataAggregated> ((acc, row) => {
            if (!acc[row.id]) acc[row.id] = [];
            acc[row.id][row.task_position] = row.task_id;
            return acc
        }, {})
        set({ kanban: kanbanDataAggregated })
    },
    setKanban: (updater) =>
        set((state) => ({kanban: typeof updater === "function" ? updater(state.kanban) : updater})),
}))