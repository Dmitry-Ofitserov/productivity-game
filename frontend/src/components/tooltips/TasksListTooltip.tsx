import { useAppContext } from "@/contexts/AppContext"
import { TooltipContent, useTooltipContext } from "@/contexts/TooltipContext";
import KanbanCard from "../elements/KanbanCard";

export function calculateTotal(tooltipContentState: TooltipContent) {
    let totalHours = 0;
    let totalPoints = 0;
    Object.entries(tooltipContentState.tasks).map(([taskId, task]) => {
        totalHours += task.hours;
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

export default function TasksListTooltip() {
    const { tooltipContentState, setTooltipContentState } = useTooltipContext();

    if (tooltipContentState.position === "") return null;
    const isTableDate = checkIsTableDate( tooltipContentState.title )

    const {totalHours, totalPoints} = calculateTotal(tooltipContentState);

    return (
        <div className={`absolute ${tooltipContentState.position === "right"? "right-0": ""} m-[40px] shadow-[0_20px_30px_rgba(0,0,0,1)] border-2 border-[#779] bg-[#334] rounded-[10px] w-[30%]`}>
            <div className="flex flex-row-reverse border-b-[2px] border-[#779]">
                <div className="w-[190px] flex text-[12px]">
                    <div className="flex-1 flex justify-center items-center">
                        hours:
                        <span 
                            className="ml-[5px] bg-[#95560B] rounded-[5px] px-[5px]"
                            style={{fontFamily: "'Inter'"}}
                        >
                            {totalHours}
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
                        {formatDate(tooltipContentState.title, isTableDate)}
                        {tooltipContentState.sticky? <span className="ml-[5px] mr-[-5px]">📌</span>: null}
                    </h3>
                </div>
            </div>
            <div 
                className="grid my-[5px] gap-y-[5px]"
                style={{
                    gridTemplateColumns: "repeat(2, 1fr)",
                }}
            >
                {Object.entries(tooltipContentState.tasks).map(([taskId, task]) => {
                    return (
                        <KanbanCard 
                            taskId={Number(taskId)} 
                            date={isTableDate? tooltipContentState.title: ""}
                        />
                    )
                })

                }
            </div>
        </div>
    )
}