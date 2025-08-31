import { GoalDataAggregated, useAppContext } from "@/contexts/AppContext"
import { useTooltipContext } from "@/contexts/TooltipContext";
import chroma from "chroma-js"
import React from "react";


export default function FinishedGoal({ goal }: {
    goal: GoalDataAggregated,
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
              title: goal.title,
              position,
              sticky: false,
              tasks: {},
            };
      
            let tasks: any = {};
            Object.entries(tasksState).map(([taskId, task]) => {
                    if (task.goalId === goal.id) tasks[taskId] = task;
            })
            
            tooltipContent.tasks = tasks;
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
                    {goal.hours}
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