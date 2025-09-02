"use client";
import { useEffect, useRef } from "react";
import { useTableStore } from "@/stores/useTableStore";
import { useKanbanStore } from "@/stores/useKanbanStore";
import { useTasksStore } from "@/stores/useTasksStore";
import { useGoalsStore } from "@/stores/useGoalsStore";

export function DataFetcher({ children }: { children: React.ReactNode }) {
  const once = useRef(false); // avoid double-run in React 18 StrictMode (dev)

  useEffect(() => {
        if (once.current) return;
        once.current = true;

        (async () => {
        const { loadTable }  = useTableStore.getState();
        const { loadKanban } = useKanbanStore.getState();
        const { loadTasks }  = useTasksStore.getState();

        await Promise.all([loadTable(), loadKanban(), loadTasks()]);

        const { loadGoals } = useGoalsStore.getState();
        const { tasks}  = useTasksStore.getState();
        await loadGoals(tasks);
        const { table}  = useTableStore.getState();
        const { kanban} = useKanbanStore.getState();
        const { goals } = useGoalsStore.getState();
        console.log("table", table);
        console.log("kanban", kanban);
        console.log("goals", goals);
        console.log("tasks", tasks);
        })();
    }, []);

  return <>{children}</>;
}
