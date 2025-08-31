import { useAppContext } from "@/contexts/AppContext";
import { useTooltipContext } from "@/contexts/TooltipContext";
import React from "react";


export default function FullStat({ totalHours, totalPoints }: {
    totalHours: number,
    totalPoints: number,
}) {
    const { setTooltipContentState } = useTooltipContext(); 
    const { tasksState } = useAppContext();
    const handleMouseEnter = React.useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
          const rect = event.currentTarget.getBoundingClientRect();
          const centerX = rect.left + 5;
          const screenCenter = window.innerWidth / 2;
          const position = centerX < screenCenter ? "right" : "left";
      
          setTooltipContentState(prev => {
            if (prev.sticky) return prev;
      
            let tooltipContent: any = {
              title: "All tasks",
              position,
              sticky: false,
              tasks: tasksState,
            };
      
            return tooltipContent;
          });
        },
        [tasksState, setTooltipContentState]
      );
    
      const handleClick = React.useCallback(() => {
        setTooltipContentState((prev) => ({ ...prev, sticky: !prev.sticky }));
      }, [setTooltipContentState]);
    
      const handleMouseLeave = React.useCallback(() => {
        setTooltipContentState((prev) =>
          prev.sticky ? prev : { title: "", position: "", sticky: false, tasks: {} }
        );
      }, [setTooltipContentState]);
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
                {totalHours}
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