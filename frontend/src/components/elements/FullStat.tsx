import { useTasksStore } from "@/stores/useTasksStore";
import { useTooltipDataStore } from "@/stores/useTooltipStore";
import React from "react";


export default function FullStat({ totalHours, totalPoints }: {
    totalHours: number,
    totalPoints: number,
}) {
    //const { setTooltipData } = useTooltipContext(); 
    //const { tasks } = useAppContext();
    const setTooltipData = useTooltipDataStore((state) => state.setTooltipData);
    const tasks = useTasksStore((state) => state.tasks);
    const handleMouseEnter = React.useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
          const rect = event.currentTarget.getBoundingClientRect();
          const centerX = rect.left + 5;
          const screenCenter = window.innerWidth / 2;
          const position = centerX < screenCenter ? "right" : "left";
      
          setTooltipData(prev => {
            if (prev.sticky) return prev;
      
            let tooltipContent: any = {
              title: "All tasks",
              position,
              sticky: false,
              tasks: tasks,
            };
      
            return tooltipContent;
          });
        },
        [tasks, setTooltipData]
      );
    
      const handleClick = React.useCallback(() => {
        setTooltipData((prev) => ({ ...prev, sticky: !prev.sticky }));
      }, [setTooltipData]);
    
      const handleMouseLeave = React.useCallback(() => {
        setTooltipData((prev) =>
          prev.sticky ? prev : { title: "", position: "", sticky: false, tasks: {} }
        );
      }, [setTooltipData]);
    return (
        <button 
            className="flex justify-evenly items-center border-b-2 border-[#404060] py-[3px] w-full h-[35px]"
            onMouseEnter={handleMouseEnter}
            onClick={handleClick}
            onMouseLeave={handleMouseLeave}
        >
        <h4 
            className="flex items-center h-full"
        >
            hours: 
            <div 
                className="flex items-center bg-[#DC1500] h-full px-[4px] ml-[10px] rounded-[5px]"
                style={{fontFamily:"'Inter'", fontWeight: 800}}
            >
                {Math.round(totalHours*10)/10}
            </div>
        </h4>
        <h4 
            className="flex items-center h-full"
        >
            points: 
            <div 
                className="flex items-center bg-[#C97C00] h-full px-[4px] ml-[10px] rounded-[5px]"
                style={{fontFamily:"'Inter'", fontWeight: 800}}
            >
                {totalPoints}
            </div>
        </h4>
    </button>
    )
}