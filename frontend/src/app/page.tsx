"use client";
import Table from "@/components/main-page/Table";
import Kanban from "@/components/main-page/Kanban";
import Goals from "@/components/main-page/Goals";
import TasksListTooltip from "@/components/tooltips/TasksListTooltip";

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <Table />
      <div className="flex-1 flex flex-col">
        <Kanban />
        <Goals />
      </div>
      <TasksListTooltip/>
    </div>
  );
}
