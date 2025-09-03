import { GoalDataAggregated } from "@/stores/useGoalsStore";
import { useTooltipDataStore } from "@/stores/useTooltipStore";
import chroma from "chroma-js"
import React from "react";


export default function FinishedGoal({ goal }: {
    goal: GoalDataAggregated,
}) {    
    console.log("FinishedGoalRerender", )
    const setTooltipData = useTooltipDataStore((state) => state.setTooltipData);

    const handleMouseEnter = React.useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
          const rect = event.currentTarget.getBoundingClientRect();
          const centerX = rect.left + 5;
          const screenCenter = window.innerWidth / 2;
          const position = centerX < screenCenter ? "right" : "left";
      
          setTooltipData(prev => {
            if (prev.sticky) return prev;
      
            let tooltipData: any = {
              title: goal.title,
              position,
              sticky: false,
              goalId: goal.id,
            };
      
            return tooltipData;
          });
        },
        [setTooltipData]
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
            className="h-[25px] flex items-center justify-between"
            onMouseEnter={handleMouseEnter}
            onClick={handleClick}
            onMouseLeave={handleMouseLeave}
        >
            <div className="flex items-center">
                <div 
                    className="h-[20px] w-[20px] border-2 rounded-[10px]" 
                    style={{backgroundColor: chroma(goal.color).darken(1.2).hex(), borderColor: goal.color}}
                />
                <span className="text-[12px] ml-[5px]">
                    {goal.title}
                </span>
            </div>
            <div className="w-[90px] h-full flex justify-between">
                <div 
                    className="flex items-center justify-center mr-[10px] bg-[#DC1500] h-full px-[3px] rounded-[5px] text-[12px] min-w-[30px]"
                    style={{fontFamily:"'Inter'", fontWeight: 800}}
                >
                    {Math.round(goal.ms / 1000 / 3600 * 10) / 10}
                </div>
                <div 
                    className="flex items-center justify-center bg-[#C97C00] h-full px-[3px] rounded-[5px] text-[12px] min-w-[30px]"
                    style={{fontFamily:"'Inter'", fontWeight: 800}}
                >
                    {goal.points}
                </div>
            </div>
        </button>
    )
}