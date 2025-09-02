import { BigSolvedTickMark, BigUnsolvedTickMark, SmallSolvedTickMark, SmallUnsolvedTickMark } from '../../assets/tick-marks'
import chroma from "chroma-js";
import { TagIcon } from '@/assets/tag';
import StepDescription from "../elements/StepDescription";
import FinishedGoal from "../elements/FinishedGoal";
import FullStat from "../elements/FullStat";
import { useTasksStore } from '@/stores/useTasksStore';
import { GoalDataAggregated, useGoalsStore } from '@/stores/useGoalsStore';

function calculateMilestoneTotal({ goals, goalPosition, milestoneLastPosition }: {
    goals: GoalDataAggregated[];
    goalPosition: number;
    milestoneLastPosition: number;
}): [number, number] {
    let totalPoints = 0;
    let totalHours = 0;
    for (let milestonePosition = 0; milestonePosition <= milestoneLastPosition; milestonePosition++) {
        totalPoints += goals[goalPosition].milestones[milestonePosition].points;
        totalHours += goals[goalPosition].milestones[milestonePosition].ms / 1000 / 3600;
    }
    return [totalPoints, totalHours];
}

function calculateStepTotal({ goals, goalPosition, milestoneLastPosition, stepLastPosition }: {
    goals: GoalDataAggregated[];
    goalPosition: number;
    milestoneLastPosition: number;
    stepLastPosition: number;
}): [number, number] {
    let totalPoints = 0;
    let totalHours = 0;
    for (let milestonePosition = 0; milestonePosition < milestoneLastPosition; milestonePosition++) {
        totalPoints += goals[goalPosition].milestones[milestonePosition].points;
        totalHours += goals[goalPosition].milestones[milestonePosition].ms / 1000 / 3600;
    }
    for (let stepPosition = 0; stepPosition <= stepLastPosition; stepPosition++) {
        totalPoints += goals[goalPosition].milestones[milestoneLastPosition].steps[stepPosition].points;
        totalHours += goals[goalPosition].milestones[milestoneLastPosition].steps[stepPosition].ms / 1000 / 3600;
    }
    return [totalPoints, totalHours];
}


export default function Goals() {
    const tasks = useTasksStore((state) => state.tasks);
    const goals = useGoalsStore((state) => state.goals);

    const totalHours = Object.values(tasks).reduce<number>((sum, task) => sum + task.ms, 0) / 1000 / 3600;
    const totalPoints = Object.values(tasks).reduce<number>((sum, task) => sum + task.points, 0);

    return (
        <div className="flex flex-[2.3] max-h-[42.6%]" >
            <div className="flex-[4.5] flex gap-[5px] border-[2px] border-[#404060] bg-[#181C20] rounded-[10px] m-[5px] p-[5px] mt-[0px] overflow-x-auto scrollbar-hide">
                { Object.entries(goals).map(([goalPosition, goal]) => {
                let milestoneOrder = 0;
                if (goal.currentLevel !== -1)
                return (
                    <div key={`${goalPosition}`} className="flex relative min-w-75 h-full p-[5px] bg-[#1C2127] border-[1px] border-[#666666] rounded-[5px]">
                        <div className="relative h-full">
                            <div className="absolute top-[12px] w-[60px] h-[calc(100%-30px)] flex flex-col-reverse z-50">
                                { Object.entries(goal.milestones).map(([milestonePosition, milestone]) => {
                                milestoneOrder++;
                                let stepOrder = 0;
                                return (
                                    <div key={`${milestonePosition}`} className="relative flex flex-col-reverse flex-1 hover:border-1 border-blue-500">
                                        {milestoneOrder < Object.keys(goal.milestones).length ? 
                                            (milestoneOrder <= goal.currentLevel ? 
                                            <div className="absolute hover:border-2 top-[-17px] w-[60px]">
                                                <BigSolvedTickMark className="absolute w-[60px]" />
                                                <div 
                                                    className="w-full flex justify-center top-[8px] absolute text-[12px] font-extrabold text-[#000000]"
                                                    style={{ fontFamily: "'Inter', sans-serif" }}
                                                >{ calculateMilestoneTotal({goals, goalPosition: Number(goalPosition), milestoneLastPosition: Number(milestonePosition)})[0] }</div>
                                            </div>:
                                                <BigUnsolvedTickMark className="absolute left-[5px] top-[-6px] w-[50px]" />
                                            ) : 
                                            null
                                        }
                                        { Object.entries(milestone.steps).map(([stepPosition, step]) => {
                                            stepOrder++;
                                            if (step.description !== "milestone") {
                                                return (
                                                    <div key={`${stepPosition}`} className="relative flex flex-1 hover:border-1 border-green-500">
                                                        {stepOrder <= Object.keys(milestone.steps).length? 
                                                            (milestoneOrder < goal.currentLevel || stepOrder <= goal.currentLevel*10%10 && milestoneOrder <= goal.currentLevel+1 ? 
                                                            <div className="relative flex justify-center w-[50px] left-[5px] top-[-7px] hover:border-3">
                                                                <SmallSolvedTickMark className="absolute w-[32.5px]" />
                                                                <div 
                                                                className="absolute top-[-1px] text-[10px] font-extrabold text-[#000000]"
                                                                style={{ fontFamily: "'Inter', sans-serif" }}
                                                                >{ calculateStepTotal({goals, goalPosition: Number(goalPosition), milestoneLastPosition: Number(milestonePosition), stepLastPosition: Number(stepPosition)})[0] }</div>
                                                            </div> : 
                                                            
                                                            <div className="relative w-[30px] left-[15px] top-[-4px] hover:border-1">
                                                                <SmallUnsolvedTickMark className="absolute w-[30px]" /> 
                                                                <div className="absolute"></div>
                                                            </div>
                                                            ) : 
                                                            null
                                                        }
                                                    </div>
                                                )
                                            }
                                        })}
                                        <div className="flex flex-1 hover:border-1 border-red-500" />
                                    </div>
                                )
                                })}   
                            </div>
                            <div className="absolute hover:border-1 w-[60px] h-[calc(100%-6px)] z-21">
                                <div 
                                    className="absolute bottom-[-6px] w-[60px] h-[12px] rounded-[50%_/_50%] bg-black mt-[-6px] z-21"
                                    style={{
                                        background: `linear-gradient(to right, ${goal.color} 0%, ${chroma(goal.color).brighten(2).hex()} 40%, ${goal.color} 100%)`,
                                    }}
                                />
                                <div 
                                    className="absolute bottom-[0px] w-[60px] bg-black hover:border-1 z-20" 
                                    style={{
                                        height: `${Math.min(5.5 + 92.7/goal.milestones.length*(Math.floor(goal.currentLevel) + (((goal.currentLevel*10)%10)/goal.milestones[Math.floor(goal.currentLevel)]?.steps.length || 0)), 97)}%`,
                                        background: `linear-gradient(to right, ${goal.color} 0%, ${chroma(goal.color).brighten(2).hex()} 40%, ${goal.color} 100%)`,
                                    }}
                                />
                                <div 
                                    className="absolute bottom-[-6px] w-[60px] h-[12px] rounded-[50%_/_50%] bg-black z-21"
                                    style={{
                                        background: `linear-gradient(to right, ${chroma(goal.color).darken(1).hex()} 0%, ${chroma(goal.color).brighten(1).hex()} 60%, ${chroma(goal.color).darken().hex()} 100%)`,
                                        bottom: `${Math.min(3.7 + 92.7/goal.milestones.length*(Math.floor(goal.currentLevel) + (((goal.currentLevel*10)%10)/goal.milestones[Math.floor(goal.currentLevel)]?.steps.length || 0)), 95.6)}%`,
                                    }}
                                />
                            </div>
                            <div className="relative w-[60px] h-full mr-[5x]">
                                {goal.milestones.length !== 0? (
                                    <div className="relative w-[60px] h-[6px]">
                                        <div className="absolute w-[60px] h-[12px] bg-[linear-gradient(90deg,#E80E0E_0%,#FF0000_60%,#E80E0E_100%)] rounded-[50%_/_50%] bg-black mb-[-6px] z-40" />
                                        <div className="absolute w-[60px] h-[6px] top-[6px] bg-[linear-gradient(90deg,#B80000_0%,#E70000_40%,#B80000_100%)] z-30" />
                                        <div className="absolute w-[60px] h-[12px] top-[6px] bg-[linear-gradient(90deg,#B80000_0%,#E70000_40%,#B80000_100%)] rounded-[50%_/_50%] bg-black mb-[-6px] z-30" />
                                    </div>
                                ): (
                                    <div className="relative w-[60px] h-[6px]">
                                        <div className="absolute w-[60px] h-[12px] bg-[linear-gradient(90deg,#372222_0%,#603E3E_60%,#372222_100%)] rounded-[50%_/_50%] bg-black mb-[-6px] z-40" />
                                        <div className="absolute w-[60px] h-[6px] top-[6px] bg-[linear-gradient(90deg,#231717_0%,#422F2F_40%,#231717_100%)] z-30" />
                                        <div className="absolute w-[60px] h-[12px] top-[6px] bg-[linear-gradient(90deg,#231717_0%,#422F2F_40%,#231717_100%)] rounded-[50%_/_50%] bg-black mb-[-6px] z-30" />
                                    </div>
                                )}
                                
                                <div className="relative w-[60px] h-[calc(100%-12px)] bg-[linear-gradient(90deg,#35353D_0%,#49494B_40%,#35353D_100%)] z-10" />
                                <div className="relative">
                                    <div className="relative w-[60px] h-[12px] bg-[linear-gradient(90deg,#212126_0%,#38383F_60%,#212126_100%)] rounded-[50%_/_50%] bg-black mt-[-6px] z-20"></div>
                                    <div 
                                    className="absolute ml-[25%] w-[50%] rounded-[10px] top-[-12px] font-extrabold text-center text-[13px] z-22"
                                    style={{ fontFamily: "'Inter', sans-serif", background: `${chroma(goal.color).darken(1).hex()}` }}
                                    >{goal.points}</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col h-[calc(100%-5px)] mt-[3px] justify-center items-center ml-[10px] w-[100%] max-w-[76%]">
                            <div className="flex flex-col-reverse h-[calc(100%-10px)] w-full">
                                { Object.entries(goal.milestones).map(([milestonePosition, milestone]) =>{

                                    return (
                                        <div key={`${milestonePosition}`} className="flex flex-col-reverse flex-1 hover:border-1 border-red-500">
                                        { Object.entries(milestone.steps).map(([stepPosition, step]) => {
                                            
                                            return (
                                                <StepDescription 
                                                    stepPosition={Number(stepPosition)} 
                                                    step={step}
                                                    milestone={milestone}
                                                />                                        
                                            )

                                        })}
                                        </div>
                                    )
                                })

                                }
                            </div>
                            <div className="flex w-full h-[25px]">
                                <div className="flex justify-center w-full">
                                    <h3 
                                    className="h-[22px] w-fit px-[10px] rounded-[5px] flex items-center justify-center text-[13px] leading-none border-2"
                                    style={{ fontFamily: "'Inter'", background: `${chroma(goal.color).darken(1.4).hex()}`, borderColor: `${chroma(goal.color).darken(2).hex()}`}}
                                    >
                                        {goal.title}
                                    </h3>
                                </div>
                                <button 
                                    className="flex justify-center items-center w-[24px] right-0 rounded-[5px] hover:scale-115 transition-transform duration-20 hover:border-2"
                                    style={{ background: chroma(goal.color).darken(1).hex(), borderColor: chroma(goal.color).brighten(1).hex() }}
                                >
                                    <TagIcon color="#ffffff" />
                                </button>
                                <button className="flex justify-center items-center w-[24px] right-0 rounded-[5px] hover:scale-115 transition-transform duration-20 hover:border-2">
                                    <img src="main-page/more-options.svg" className="w-1"/>
                                </button>
                            </div>
                        </div>
                    </div>
                )
                })}
            </div>
        <div className="flex-1 flex flex-col border-1 ml-[0px] m-[5px] border-[2px] border-[#404060] bg-[#181C20] rounded-[10px] mt-[0px]">
            <FullStat
                totalHours={totalHours}
                totalPoints={totalPoints}
            />
            <div className="flex flex-col justify-start gap-[10px] p-[5px] overflow-y-auto scrollbar-hide">
                {Object.entries(goals).map(([goalPosition, goal]) => {
                    if (goal.currentLevel === -1){
                        return(
                            <FinishedGoal 
                                goal={goal}
                             />
                        )
                    }
                })

                }
            </div>
        </div>
      </div>
    )
}