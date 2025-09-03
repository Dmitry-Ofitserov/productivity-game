import { useKanbanStore } from "@/stores/useKanbanStore";
import KanbanCard from "../elements/KanbanCard";


export default function Kanban() {
  
  const kanban = useKanbanStore((state) => state.kanban)
  const DOWMap = ["Daily tasks", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", 'Pile'];
  return (
      <div className="flex-[3] flex m-[5px] border-[2px] border-[#404060] bg-[#181C20] rounded-[10px] overflow-hidden overflow-y-auto ">
          {Array.from({length: 9}).map((_, dow) => {
            return (
              <div key={`${dow}`} className={`w-full ${dow < 8 ? "border-r-[3px]" : ""} border-[#33383D]`}>
                <div className="flex text-[13px] items-center justify-center border-b-[2px] border-[#383F4D] bg-[#222237]">
                  {DOWMap[dow]}
                </div>
                <div className="flex flex-col text-[10px] gap-[3px] mt-[5px]">
                  {kanban[dow] && Object.entries(kanban[dow]).map(([index, taskId], dowId) => {
                    return (
                      <KanbanCard key={taskId} taskId={taskId} />
                    )
                  })}
                </div>
              </div>
            )
          })}
      </div>
  )
}