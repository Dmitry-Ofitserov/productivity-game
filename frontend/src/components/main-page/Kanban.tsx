import { GoalDataAggregated, KanbanDataAggregated, TasksDataAggregated } from "@/app/page";


function formatDate(isoDateString: string) {
    if (!isoDateString) return "хуй";
    const [datePart, timePart] = isoDateString.split(' ');
    const [_, month, day] = datePart.split('-');
    const [hours, minutes] = timePart.split(':');
    return `${day}-${month} ${hours}:${minutes}`;
}

function formatDuration(durationNumber: number) {
    if (durationNumber == null) return "хуй";
    const hours = Math.floor(durationNumber);
    const minutes = Math.floor((durationNumber*60) % 60);
    const seconds = Math.floor((durationNumber*3600) % 60);
    const paddedMinutes = minutes.toString().padStart(2, '0');
    const paddedSeconds = seconds.toString().padStart(2, '0');
    
    return `${hours}:${paddedMinutes}:${paddedSeconds}`;
}


export default function Kanban({ tasksState, setTasksState, kanbanState, setKanbanState, goalsState }: 
    {
        tasksState: TasksDataAggregated;
        setTasksState: React.Dispatch<React.SetStateAction<TasksDataAggregated>>;
        kanbanState: KanbanDataAggregated;
        setKanbanState: React.Dispatch<React.SetStateAction<KanbanDataAggregated>>;
        goalsState: GoalDataAggregated[];
    }) {
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
                    {kanbanState[dow] && Object.entries(kanbanState[dow]).map(([index, taskId], dowId) => {
                      return (
                        <div key={`${index}`} className="border-[1px] border-[#666666] ml-[5px] mr-[5px] rounded-[5px] p-[5px] pt-[4px] leading-tight font-[200] bg-[#1C2127]">
                            <div className="flex justify-between mb-[2px]">
                                <button className="w-[12px] h-[12px] border-[1px] border-[#8787B9] rounded-[3px]"></button>
                                <div className="flex gap-[3px]">
                                    <button className="h-[12px] px-[4px] b<g-[#521779] rounded-[3px]">{formatDate(tasksState[taskId].endTime)}</button>
                                    <button className="h-[12px] px-[4px] bg-[#85560B] rounded-[3px]">{formatDuration(tasksState[taskId].duration)}</button>
                                    <button className="h-[12px] px-[4px] bg-[#85560B] rounded-[3px]">{tasksState[taskId].points}</button>
                                </div>
                                <button className="flex justify-center items-center w-[12px] h-[12px] hover:border-[1px] border-[#8888DD] hover:bg-[#000000] hover:scale-125 transition-transform duration-20 rounded-[3px]">
                                    <img src="main-page/more-options.svg" />
                                </button>
                            </div>
                            {tasksState[taskId].description}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
        </div>
    )
}