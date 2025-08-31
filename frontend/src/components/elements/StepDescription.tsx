import { MilestoneDataAggregated, StepData, useAppContext } from "@/contexts/AppContext"
import { useTooltipContext } from "@/contexts/TooltipContext";
import React from "react";

export default function StepDescription( { stepPosition, step, milestone }:{
    stepPosition: number,
    step: StepData,
    milestone: MilestoneDataAggregated
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
              title: step.description !== "milestone"? step.description: milestone.description,
              position,
              sticky: false,
              tasks: {},
            };
      
            let tasks: any = {};
            Object.entries(tasksState).map(([taskId, task]) => {
                if (step.description !== "milestone") {
                    if (task.stepId === step.id) tasks[taskId] = task;
                } else {
                    if (task.milestoneId === milestone.id) tasks[taskId] = task;
                }
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
        key={`${stepPosition}`} 
        className={`flex flex-col flex-1 w-full min-w-0 hover:border-1 border-blue-500 text-left leading-none`}
        style={{ 
            fontFamily: "'Inter'", 
            fontSize: step.description !== "milestone" ? "11px" : "12px",
            color: step.description == "milestone"? "#EBEBFF": "#A7A7C5",
        }}
        onMouseEnter={handleMouseEnter}
        onClick={handleClick}
        onMouseLeave={handleMouseLeave}
    >
        {step.description !== "milestone"? step.description: milestone.description}
    </button>
    )
}