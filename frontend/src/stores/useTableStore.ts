'use client'

import { create } from 'zustand'

export type TableDataAggregated = {
    [date: string]: {
        points: number,
        ms: number,
        tasks: {
            [taskId: number]: {
                ms: number,
                points: number,
                endTime: string,
            }
        }
    }
}

interface TableStore {
    table: TableDataAggregated
    loadTable: () => Promise<void>
    setTable: (updater: TableDataAggregated | ((state: TableDataAggregated) => TableDataAggregated)) => void
}

export const useTableStore = create<TableStore>((set) => ({
    table: {},
    loadTable: async () => {
        const tableData = await window.electronAPI.getTable()
        const tableDataAggregated = tableData.reduce<TableDataAggregated> ((acc, row) => {
            if (!acc[row.date]) {
                acc[row.date] = {
                    points: 0,
                    ms: 0,
                    tasks: {},
                }
            }

            acc[row.date].points += row.points
            acc[row.date].ms += row.ms
            acc[row.date].tasks[row.task_id] = {
                ms: row.ms,
                points: row.points,
                endTime: row.end_time,
            }

            return acc
        }, {})
        set({ table: tableDataAggregated })
    },
    setTable: (updater) =>
        set((state) => ({table: typeof updater === "function" ? updater(state.table) : updater})),

}))