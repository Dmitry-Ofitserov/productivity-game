import { TooltipData, useTooltipDataStore } from "@/stores/useTooltipStore";
import KanbanCard from "../elements/KanbanCard";
import { TasksDataAggregated, useTasksStore } from "@/stores/useTasksStore";
import { useTableStore } from "@/stores/useTableStore";

export function calculateTotal(tooltipTasks: TasksDataAggregated) {
    let totalHours = 0;
    let totalPoints = 0;
    Object.entries(tooltipTasks).map(([taskId, task]) => {
        totalHours += task.ms / 1000 / 3600;
        totalPoints += task.points;
    })
    return {totalHours, totalPoints};
}

function checkIsTableDate(dateStr: string): boolean {
    const regex = /^\d{4}-\d{2}-\d{2}/;
    return regex.test(dateStr);
}

function formatDate(dateStr: string, isTableDate: boolean): string {

    if (!isTableDate) return dateStr
    const date = new Date(dateStr);
  
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
  
    return date.toLocaleDateString("en-GB", options);
  }

function findTooltipTasks(isTableDate: boolean, tooltipData: TooltipData) {
    let tooltipTasks: any = {};
    if (isTableDate) {
        tooltipTasks = useTableStore.getState().table[tooltipData.title]?.tasks || {};
    } else {
        const tasks = useTasksStore.getState().tasks;
        Object.entries(tasks).map(([taskId, task]) => {
            if (tooltipData.stepId) {
                if (task.stepId === tooltipData.stepId) tooltipTasks[taskId] = task;
            } else if (tooltipData.milestoneId) {
                if (task.milestoneId === tooltipData.milestoneId) tooltipTasks[taskId] = task;
            } else if (tooltipData.goalId) {
                if (task.goalId === tooltipData.goalId) tooltipTasks[taskId] = task;
            } else {
                tooltipTasks[taskId] = task;
            }
        })
    }
    return tooltipTasks;
}

export default function TasksListTooltip() {
    //const { tooltipData, setTooltipContentState } = useTooltipContext();
    const tooltipData = useTooltipDataStore((state) => state.tooltipData);
    if (tooltipData.position === "") return null;

    const isTableDate = checkIsTableDate( tooltipData.title )
    const tooltipTasks = findTooltipTasks(isTableDate, tooltipData);
    const {totalHours, totalPoints} = calculateTotal(tooltipTasks);

    return (
        <div className={`absolute ${tooltipData.position === "right"? "right-0": ""} m-[40px] shadow-[0_20px_30px_rgba(0,0,0,1)] border-2 border-[#779] bg-[#334] rounded-[10px] w-[30%]`}>
            <div className="flex flex-row-reverse border-b-[2px] border-[#779]">
                <div className="w-[190px] flex text-[12px]">
                    <div className="flex-1 flex justify-center items-center">
                        hours:
                        <span 
                            className="ml-[5px] bg-[#95560B] rounded-[5px] px-[5px]"
                            style={{fontFamily: "'Inter'"}}
                        >
                            {Math.round(totalHours*10)/10}
                        </span>
                    </div>
                    <div className="flex-1 flex justify-center items-center">
                        points:
                        <span 
                            className="ml-[5px] bg-[#95560B] rounded-[5px] px-[5px]"
                            style={{fontFamily: "'Inter'"}}
                        >
                            {totalPoints}
                        </span>
                    </div>
                </div>
                <div className="flex justify-center flex-1">
                    <h3 className="border-1 border-[#668] m-[5px] rounded-[5px] h-[25px] p-[12px] bg-[#454555] flex items-center justify-center text-[14px]">
                        {formatDate(tooltipData.title, isTableDate)}
                        {tooltipData.sticky? <span className="ml-[5px] mr-[-5px]">📌</span>: null}
                    </h3>
                </div>
            </div>
            <div 
                className="grid my-[5px] gap-y-[5px]"
                style={{
                    gridTemplateColumns: "repeat(2, 1fr)",
                }}
            >
                {Object.entries(tooltipTasks).map(([taskId, task]) => {
                    return (
                        <KanbanCard 
                            taskId={Number(taskId)} 
                            date={isTableDate? tooltipData.title: ""}
                        />
                    )
                })

                }
            </div>
        </div>
    )
}