import { MilestoneDataAggregated, StepData } from "@/stores/useGoalsStore";
import { useTooltipDataStore } from "@/stores/useTooltipStore";
import React from "react";

export default function StepDescription( { stepPosition, step, milestone }:{
    stepPosition: number,
    step: StepData,
    milestone: MilestoneDataAggregated
}) {
    //const { setTooltipData } = useTooltipContext(); 
    //const { tasks } = useAppContext();

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
              title: step.description !== "milestone"? step.description: milestone.description,
              position,
              sticky: false,
              stepId: step.description !== "milestone"? step.id: null,
              milestoneId: step.description === "milestone"? milestone.id: null
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