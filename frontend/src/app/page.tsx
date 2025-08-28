"use client";
import { useEffect, useState } from "react";
import chroma from 'chroma-js';
import Image from "next/image";

import { BigSolvedTickMark, BigUnsolvedTickMark, SmallSolvedTickMark, SmallUnsolvedTickMark } from '../assets/tick-marks'
import Table from "@/components/main-page/Table";


export type GoalDataAggregated = {
  title: string;
  currentLevel: number;
  milestones: MilestoneDataAggregated[];
}

export type MilestoneDataAggregated = {
  id: number;
  description: string;
  steps: StepData[];
}

export type StepData = {
  id: number;
  description: string;
}

export default function Home() {
  useEffect(() => {
    console.log("electronAPI in renderer:", window.electronAPI);
  })

  // Unwrap default if needed
  const BigSolved = (BigSolvedTickMark as any).default || BigSolvedTickMark;
  const BigUnsolved = (BigUnsolvedTickMark as any).default || BigUnsolvedTickMark;




  const DOWMap = ["Daily tasks", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", 'Pile'];
  let progressBars = {
    "1": {
      "color": "#FFE27C",
      "title": "Достичь хуй",
      "currentLevel": 0.1,
      "milestones": 
      {
        "1": 
        {
          "title": "хуище",
          "steps": 
          {
            "1": 
            {
              "title": "хуёчек",
              "tasks": 
              {
                "1":
                {
                  "description": "пизда пизда пизда",
                  "hours": 10,
                  "points": 10,
                },
                "2":
                {
                  "description": "пизда пизда пизда",
                  "hours": 10,
                  "points": 10,
                }
              }
            },
            "2": 
            {
              "title": "хуёчек",
              "tasks": 
              {
                "1":
                {
                  "description": "пизда пизда пизда",
                  "hours": 10,
                  "points": 10,
                },
                "2":
                {
                  "description": "пизда пизда пизда",
                  "hours": 10,
                  "points": 10,
                }
              }
            }
          }
        },
        "2": 
        {
          "title": "хуище",
          "steps": 
          {
            "1": 
            {
              "title": "хуёчек",
              "tasks": 
              {
                "1":
                {
                  "description": "пизда пизда пизда",
                  "hours": 10,
                  "points": 10,
                },
                "2":
                {
                  "description": "пизда пизда пизда",
                  "hours": 10,
                  "points": 10,
                }
              }
            },
            "2": 
            {
              "title": "хуёчек",
              "tasks": 
              {
                "1":
                {
                  "description": "пизда пизда пизда",
                  "hours": 10,
                  "points": 10,
                },
                "2":
                {
                  "description": "пизда пизда пизда",
                  "hours": 10,
                  "points": 10,
                }
              }
            }
          }
        }
      },
    },
    "2": {
      "color": "#FFE27C",
      "title": "Достичь хуй",
      "currentLevel": 1.1,
      "milestones": 
      {
        "1": 
        {
          "title": "хуище",
          "steps": 
          {
            "1": 
            {
              "title": "хуёчек",
              "tasks": 
              {
                "1":
                {
                  "description": "пизда пизда пизда",
                  "hours": 10,
                  "points": 10,
                },
                "2":
                {
                  "description": "пизда пизда пизда",
                  "hours": 10,
                  "points": 10,
                }
              }
            },
            "2": 
            {
              "title": "хуёчек",
              "tasks": 
              {
                "1":
                {
                  "description": "пизда пизда пизда",
                  "hours": 10,
                  "points": 10,
                },
                "2":
                {
                  "description": "пизда пизда пизда",
                  "hours": 10,
                  "points": 10,
                }
              }
            }
          }
        },
        "2": 
        {
          "title": "хуище",
          "steps": 
          {
            "1": 
            {
              "title": "хуёчек",
              "tasks": 
              {
                "1":
                {
                  "description": "пизда пизда пизда",
                  "hours": 10,
                  "points": 10,
                },
                "2":
                {
                  "description": "пизда пизда пизда",
                  "hours": 10,
                  "points": 10,
                }
              }
            },
            "2": 
            {
              "title": "хуёчек",
              "tasks": 
              {
                "1":
                {
                  "description": "пизда пизда пизда",
                  "hours": 10,
                  "points": 10,
                },
                "2":
                {
                  "description": "пизда пизда пизда",
                  "hours": 10,
                  "points": 10,
                }
              }
            }
          }
        }
      },
    },
  };
  let columnEntries = {
    "Daily tasks": [
      {
      "description": "хуй хуй хуй",
      "hours": 5.5,
      "points": 15,
      "color": "#55FF55",
      "goalId": 10
      },
      {
        "description": "хуй хуй хуй",
        "hours": 5.5,
        "points": 15,
        "color": "#55FF55",
        "goalId": 10
      },
      {
        "description": "хуй хуй хуй",
        "hours": 5.5,
        "points": 15,
        "color": "#55FF55",
        "goalId": 10
      },
      {
        "description": "хуй хуй хуй",
        "hours": 5.5,
        "points": 15,
        "color": "#55FF55",
        "goalId": 10
      },
    ],
    "Monday": [
      {
      "description": "хуй хуй хуй",
      "hours": 5.5,
      "points": 15,
      "color": "#55FF55",
      "goalId": 10
      },
      {
        "description": "хуй хуй хуй",
        "hours": 5.5,
        "points": 15,
        "color": "#55FF55",
        "goalId": 10
      },
      {
        "description": "хуй хуй хуй",
        "hours": 5.5,
        "points": 15,
        "color": "#55FF55",
        "goalId": 10
      },
      {
        "description": "хуй хуй хуй",
        "hours": 5.5,
        "points": 15,
        "color": "#55FF55",
        "goalId": 10
      },
    ],
    "Tuesday": [
      {
      "description": "хуй хуй хуй",
      "hours": 5.5,
      "points": 15,
      "color": "#55FF55",
      "goalId": 10
      },
      {
        "description": "хуй хуй хуй",
        "hours": 5.5,
        "points": 15,
        "color": "#55FF55",
        "goalId": 10
      },
      {
        "description": "хуй хуй хуй",
        "hours": 5.5,
        "points": 15,
        "color": "#55FF55",
        "goalId": 10
      },
      {
        "description": "хуй хуй хуй",
        "hours": 5.5,
        "points": 15,
        "color": "#55FF55",
        "goalId": 10
      },
    ],
    "Wednesday": [
      {
      "description": "хуй хуй хуй",
      "hours": 5.5,
      "points": 15,
      "color": "#55FF55",
      "goalId": 10
      },
      {
        "description": "хуй хуй хуй",
        "hours": 5.5,
        "points": 15,
        "color": "#55FF55",
        "goalId": 10
      },
      {
        "description": "хуй хуй хуй",
        "hours": 5.5,
        "points": 15,
        "color": "#55FF55",
        "goalId": 10
      },
      {
        "description": "хуй хуй хуй",
        "hours": 5.5,
        "points": 15,
        "color": "#55FF55",
        "goalId": 10
      },
    ],
    "Thursday": [
      {
      "description": "хуй хуй хуй",
      "hours": 5.5,
      "points": 15,
      "color": "#55FF55",
      "goalId": 10
      },
      {
        "description": "хуй хуй хуй",
        "hours": 5.5,
        "points": 15,
        "color": "#55FF55",
        "goalId": 10
      },
      {
        "description": "хуй хуй хуй",
        "hours": 5.5,
        "points": 15,
        "color": "#55FF55",
        "goalId": 10
      },
      {
        "description": "хуй хуй хуй",
        "hours": 5.5,
        "points": 15,
        "color": "#55FF55",
        "goalId": 10
      },
    ],
    "Friday": [
      {
      "description": "хуй хуй хуй",
      "hours": 5.5,
      "points": 15,
      "color": "#55FF55",
      "goalId": 10
      },
      {
        "description": "хуй хуй хуй",
        "hours": 5.5,
        "points": 15,
        "color": "#55FF55",
        "goalId": 10
      },
      {
        "description": "хуй хуй хуй",
        "hours": 5.5,
        "points": 15,
        "color": "#55FF55",
        "goalId": 10
      },
      {
        "description": "хуй хуй хуй",
        "hours": 5.5,
        "points": 15,
        "color": "#55FF55",
        "goalId": 10
      },
    ],
    "Saturday": [
      {
      "description": "хуй хуй хуй",
      "hours": 5.5,
      "points": 15,
      "color": "#55FF55",
      "goalId": 10
      },
      {
        "description": "хуй хуй хуй",
        "hours": 5.5,
        "points": 15,
        "color": "#55FF55",
        "goalId": 10
      },
      {
        "description": "хуй хуй хуй",
        "hours": 5.5,
        "points": 15,
        "color": "#55FF55",
        "goalId": 10
      },
      {
        "description": "хуй хуй хуй",
        "hours": 5.5,
        "points": 15,
        "color": "#55FF55",
        "goalId": 10
      },
    ],
    "Sunday": [
      {
      "description": "хуй хуй хуй",
      "hours": 5.5,
      "points": 15,
      "color": "#55FF55",
      "goalId": 10
      },
      {
        "description": "хуй хуй хуй",
        "hours": 5.5,
        "points": 15,
        "color": "#55FF55",
        "goalId": 10
      },
      {
        "description": "хуй хуй хуй",
        "hours": 5.5,
        "points": 15,
        "color": "#55FF55",
        "goalId": 10
      },
      {
        "description": "хуй хуй хуй",
        "hours": 5.5,
        "points": 15,
        "color": "#55FF55",
        "goalId": 10
      },
    ],
    "Pile": [
      {
      "description": "хуй хуй хуй",
      "hours": 5.5,
      "points": 15,
      "color": "#55FF55",
      "goalId": 10
      },
      {
        "description": "хуй хуй хуй",
        "hours": 5.5,
        "points": 15,
        "color": "#55FF55",
        "goalId": 10
      },
      {
        "description": "хуй хуй хуй",
        "hours": 5.5,
        "points": 15,
        "color": "#55FF55",
        "goalId": 10
      },
      {
        "description": "хуй хуй хуй",
        "hours": 5.5,
        "points": 15,
        "color": "#55FF55",
        "goalId": 10
      },
    ]
  };

  const [ tableState, setTableState ] = useState();

  useEffect(() => {
    console.log("start loading db data");
    const loadData = async () => {
      try {
        const tableData = await window.electronAPI.getTable();
        console.log("tableData", tableData);
        const tasksData = await window.electronAPI.getTasks();
        console.log("tasksData", tasksData);
        const kanbanData = await window.electronAPI.getKanban();
        console.log("kanbanData", kanbanData);
        const goalsData = await window.electronAPI.getGoals();
        console.log("goalsData", goalsData);
        const milestonesData = await window.electronAPI.getMilestones();
        console.log("milestonesData", milestonesData);
        const stepsData = await window.electronAPI.getSteps();
        console.log("stepsData", stepsData);
        const tagsData = await window.electronAPI.getTags();
        console.log("tagsData", tagsData);
        const userData = await window.electronAPI.getUser(1);
        console.log("userData", userData);

        const tableDataAggregated = tableData.reduce((acc, row) => {
          if (!acc[row.date]) acc[row.date] = {};
          acc[row.date][row.task_id] = { hours: row.hours, points: row.points };
          return acc;
        }, {})
        console.log("tableDataAggregated: ", tableDataAggregated);

        const kanbanDataAggregated = kanbanData.reduce((acc, row) => {
          if (!acc[row.id]) acc[row.id] = [];
          acc[row.id][row.task_position] = row.task_id;
          return acc
        }, {})
        console.log("kanbanDataAggregated ", kanbanDataAggregated);

        const goalsDataAggregated = goalsData.reduce<GoalDataAggregated[]>((goalsAcc, rowGoal) => {
          goalsAcc[rowGoal.position] = {
            title: rowGoal.title,
            currentLevel: rowGoal.current_level,
            milestones: milestonesData.reduce<MilestoneDataAggregated[]>((milestonesAcc, rowMilestone) => {
              if (rowMilestone.goal_id === rowGoal.id ) milestonesAcc[rowMilestone.position] = {
                id: rowMilestone.id,
                description: rowMilestone.description,
                steps: stepsData.reduce<StepData[]>((stepsAcc, rowSteps) => {
                  if (rowSteps.milestone_id === rowMilestone.id) stepsAcc[rowSteps.position] = {
                    id: rowSteps.id,
                    description: rowSteps.description
                  };
                  return stepsAcc;
                }, [])
              };
              return milestonesAcc;
            }, [])
          };
          return goalsAcc;
        }, [])
        console.log("goalsDataAggregated: ", goalsDataAggregated);

      } catch (error) {
        console.error(error);
      }
    }
    loadData();
    
  })

  return (
    <div className="flex flex-col h-screen">
      <Table/>
      <div className="flex-1 flex flex-col">
        <div className="flex-[3] flex m-[5px] border-[2px] border-[#404060] bg-[#181C20] rounded-[10px] overflow-hidden overflow-y-auto ">
            {Array.from({length: 9}).map((_, dow) => {
              return (
                <div key={`${dow}`} className={`w-full ${dow < 8 ? "border-r-[3px]" : ""} border-[#33383D]`}>
                  <div className="flex text-[13px] items-center justify-center border-b-[2px] border-[#383F4D] bg-[#222237]">
                    {DOWMap[dow]}
                  </div>
                  <div className="flex flex-col text-[10px] gap-[3px] mt-[5px]">
                    {columnEntries[DOWMap[dow] as keyof typeof columnEntries].map((task, index) => {
                      return (
                        <div key={`${index}`} className="border-[1px] border-[#666666] ml-[5px] mr-[5px] rounded-[5px] p-[5px] leading-tight font-[200] bg-[#1C2127]">
                          <button className="w-[12px] h-[12px] ml-[-1px] mr-[5px] mt-[-1px] border-[1px] border-[#8787B9] rounded-[3px] float-left"></button>
                          <button className="w-[12px] h-[12px] ml-[5px] mr-[0px] mt-[-1px] float-right">
                            <img src="main-page/trash-can.svg" className="filter invert brightness-0 scale-130"  />
                          </button>
                          erns etn rest aern sten ars etna s ares ntersa nt rstdr tdrstd rts drstd rtdrs td
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
        </div>
        <div className="flex gap-[5px] flex-[2.3] border-[2px] border-[#404060] bg-[#181C20] rounded-[10px] m-[5px] p-[5px] mt-[0px]" >
          { Object.entries(progressBars).map(([goalId, goal]) => {
            let milestoneOrder = 0;
            return (
              <div key={`${goalId}`} className="relative w-80 h-full p-[5px] bg-[#1C2127] border-[1px] border-[#666666] rounded-[5px]">
                <div className="absolute top-[12px] w-[60px] h-[calc(100%-24px)] flex flex-col-reverse z-50">
                  { Object.entries(goal.milestones).map((milestone, milestoneId) => {
                    milestoneOrder++;
                    let stepOrder = 0;
                    return (
                      <div key={`${milestoneId}`} className="relative flex flex-col-reverse flex-1">
                        {milestoneOrder < Object.keys(goal.milestones).length ? 
                          (milestoneOrder <= goal.currentLevel ? 
                            <BigSolvedTickMark className="absolute top-[-17px] w-[60px]" /> : 
                            <BigUnsolvedTickMark className="absolute left-[5px] top-[-6px] w-[50px]" />
                          ) : 
                          null
                        }

                      </div>
                    )
                  })}   
                </div>
                <div className="w-[60px] h-full mr-[5x]">
                  <div className="relative w-[60px] h-[6px]">
                    <div className="absolute w-[60px] h-[12px] bg-[linear-gradient(90deg,#E80E0E_0%,#FF0000_60%,#E80E0E_100%)] rounded-[50%_/_50%] bg-black mb-[-6px] z-40" />
                    <div className="absolute w-[60px] h-[6px] top-[6px] bg-[linear-gradient(90deg,#B80000_0%,#E70000_60%,#B80000_100%)] z-30" />
                    <div className="absolute w-[60px] h-[12px] top-[6px] bg-[linear-gradient(90deg,#B80000_0%,#E70000_60%,#B80000_100%)] rounded-[50%_/_50%] bg-black mb-[-6px] z-20" />
                  </div>
                  <div className="relative w-[60px] h-[calc(100%-12px)] bg-[linear-gradient(90deg,#35353D_0%,#49494B_40%,#35353D_100%)] z-10" />
                  <div className="relative w-[60px] h-[12px] bg-[linear-gradient(90deg,#212126_0%,#38383F_60%,#212126_100%)] rounded-[50%_/_50%] bg-black mt-[-6px] z-20" />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}
