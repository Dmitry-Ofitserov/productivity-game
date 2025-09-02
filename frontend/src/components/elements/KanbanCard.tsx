import { useGoalsStore } from "@/stores/useGoalsStore";
import { useTableStore } from "@/stores/useTableStore";
import { useTasksStore } from "@/stores/useTasksStore";
import chroma from "chroma-js";

function formatDate(isoDateString: string) {
    if (!isoDateString) return "error";
    const [datePart, timePart] = isoDateString.split(' ');
    const [_, month, day] = datePart.split('-');
    const [hours, minutes] = timePart.split(':');
    return `${day}-${month} ${hours}:${minutes}`;
}

function formatDuration(durationNumber: number) {
    if (durationNumber == null) return "";
    const hours = Math.floor(durationNumber);
    const minutes = Math.floor((durationNumber*60) % 60);
    const seconds = Math.floor((durationNumber*3600) % 60);
    const paddedMinutes = minutes.toString().padStart(2, '0');
    const paddedSeconds = seconds.toString().padStart(2, '0');
    
    return `${hours}:${paddedMinutes}:${paddedSeconds}`;
}

function darkenAsymptotic(color: string, factor = 0.7) {
    const lab = chroma(color).lab(); 
    let L = lab[0];

    const darkenAmount = factor * (L / 100); 
  
    const newL = Math.max(0, L - darkenAmount * 100);
  
    return chroma.lab(newL, lab[1], lab[2]).hex();
  }

export default function KanbanCard ({ taskId, date }: { 
    taskId: number,
    date?: string,
}) {
    //const { tableState, tasksState, goalsState } = useAppContext();
    const table = date? useTableStore((state) => state.table[date]): null;
    const task = useTasksStore((state) => state.tasks[taskId])
    const color = useGoalsStore((state) => state.goals.find(goal => goal.id === task.goalId)?.color) || "#AAAAAA";
    return (
        <div 
            key={`${taskId}`} 
            className={`border-[1px] ml-[5px] mr-[5px] rounded-[5px] p-[5px] pt-[4px] leading-tight font-[200] bg-[#1C2127] text-[10px]`}
            style={{
                borderColor: darkenAsymptotic(color, 0.25),
                backgroundColor: darkenAsymptotic(color, 0.75)
            }}
        >
            <div className="flex justify-between mb-[2px]">
                <button className="w-[12px] h-[12px] border-[1px] border-[#8787B9] rounded-[3px]"></button>
                <div className="flex gap-[3px]">
                    <button className="h-[12px] px-[4px] bg-[#521779] rounded-[3px]">{formatDate(task?.endTime)}</button>
                    <button className="h-[12px] px-[4px] bg-[#85560B] rounded-[3px]">
                        {table? 
                            `${table.tasks[taskId].hours} / ${task.hours}`: 
                            `${formatDuration(task?.hours)}`
                        }
                    </button>
                    <button className="h-[12px] px-[4px] bg-[#85560B] rounded-[3px]">
                        {table? 
                            `${table.tasks[taskId].points} / ${task.points}`: 
                            `${task?.points}`
                        }
                    </button>
                </div>
                <button className="flex justify-center items-center w-[12px] h-[12px] hover:border-[1px] border-[#8888DD] hover:bg-[#000000] hover:scale-125 transition-transform duration-20 rounded-[3px]">
                    <img src="main-page/more-options.svg" />
                </button>
            </div>
            {task?.description}
            {color}
        </div>
    )
}