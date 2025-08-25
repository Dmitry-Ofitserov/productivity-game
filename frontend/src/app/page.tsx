"use client";
import { useEffect, useState } from "react";
import { useTogglData } from "../../hooks/useTogglData";
import chroma from 'chroma-js';
import Image from "next/image";

import { BigSolvedTickMark, BigUnsolvedTickMark, SmallSolvedTickMark, SmallUnsolvedTickMark } from '../assets/tick-marks'


function calculateDayOfWeek(year: number, day: number) {
  
  if (isNaN(year) || isNaN(day) || day < 1 || day > 366) {
      alert('Please enter valid values. Day must be between 1 and 366.');
      return;
  }

  const date = new Date(year, 0, 1);
  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  
  if (day > 365 && !isLeapYear) {
      alert(`${year} is not a leap year. Day must be between 1 and 365.`);
      return;
  }

  date.setDate(day);
  const dayOfWeek = date.getDay();
  const mondayBasedDOW = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  
  const startOfYear = new Date(year, 0, 1);
  const startDay = startOfYear.getDay();
  const adjustedStartDay = startDay === 0 ? 6 : startDay - 1; // Convert to Monday-based

  return mondayBasedDOW;
}

function calculateStartDay(year: number) {
  const startOfYearDate = new Date(year, 0, 1);
  const startDay = startOfYearDate.getDay();
  const adjustedStartDOW = startDay === 0 ? 6 : startDay-1;

  return adjustedStartDOW
}

function isLastDOWInMonth(date: Date) {
  const dayOfWeek = date.getDay();
  
  const currentMonth = date.getMonth();
  
  const nextWeekSameDay = new Date(date);
  nextWeekSameDay.setDate(date.getDate() + 7);
  
  return nextWeekSameDay.getMonth() !== currentMonth;
}

function isLastDayOfMonth(date: Date) {
  const tomorrow = new Date(date);
  tomorrow.setDate(date.getDate() + 1);
  
  return tomorrow.getMonth() !== date.getMonth();
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

  const { data, isLoading, error } = useTogglData();
  console.log("хуй", data, isLoading, error);
  let startDOW = calculateStartDay(2028);
  let date = new Date(2026, 0, 1);
  let daysCount = 0;

  let startDOW2 = calculateStartDay(2025);
  let date2 = new Date(2023, 0, 1);
  let daysCount2 = 0;
  return (
    <div className="flex flex-col h-screen">
      <div className=" bg-[#000000]">
        <div 
          className="m-[2px] aspect-158/14 grid grid-cols-[repeat(158, 1fr)] grid-rows-[repeat(158, 1fr)]">
          {Array.from({ length: 158 }).flatMap((_, column) => 
            Array.from({ length: 7}).map((_, row) => {
              if (daysCount !== 0 || row >= startDOW) {
                daysCount++;
                date = new Date(2026, 0, 1);
                date.setDate(daysCount);
              }
              let borders = "";

              if (isLastDayOfMonth(date) || daysCount === 0 && startDOW - row === 1)
                {borders = "border-r-[1px] border-b-[1px]"}
              else if (isLastDOWInMonth(date) || daysCount === 0 && startDOW - row > 1) 
                {borders = "border-r-[1px]"}

              if (daysCount !== 0 && column === 0)
                {borders += " border-l-[1px]"}
              if (row === 6 && column !== 157)
                {borders += " border-b-[1px]"}
              if (daysCount !== 0 && row === 0)
                {borders += " border-t-[1px]"}

              return (
              <div key={`${column}-${row}`} 
                className={`${borders}`}
                style={{
                  gridColumn: `${column+1} / span 1`,
                  gridRow: `${row+1} / span 1`,
                }}
              >
                {}
              </div>
            )})
          )}
          {Array.from({ length: 158 }).flatMap((_, column) => 
            Array.from({ length: 7}).map((_, row) => {
              if (daysCount2 !== 0 || row >= startDOW2) {
                daysCount2++;
                date2 = new Date(2026, 0, 1);
                date2.setDate(daysCount2);
              }
              let borders = "";

              if (isLastDayOfMonth(date2) || daysCount2 === 0 && startDOW2 - row === 1)
                {borders = "border-r-[1px] border-b-[1px]"}
              else if (isLastDOWInMonth(date2) || daysCount2 === 0 && startDOW2 - row > 1) 
                {borders = "border-r-[1px]"}

              if (daysCount2 !== 0 && column === 0)
                {borders += " border-l-[1px]"}
              if (row === 6 && daysCount2 < 1095)
                {borders += " border-b-[1px]"}
              return (
              <div key={`${column}-${row+8}`} 
                className={`${borders}`}
                style={{
                  gridColumn: `${column+1} / span 1`,
                  gridRow: `${row+8} / span 1`,
                }}
              />
            )})
          )}
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex-[3] flex m-[5px] border-[2px] border-[#404060] bg-[#181C20] rounded-[10px] overflow-hidden overflow-y-auto ">
            {Array.from({length: 9}).map((_, dow) => {
              return (
                <div key={`${dow}`} className={`w-full ${dow < 8 ? "border-r-[3px]" : ""} border-[#33383D]`}>
                  <div className="flex text-[13px] items-center justify-center border-b-[2px] border-[#383F4D] bg-[#222237]">
                    {DOWMap[dow]}
                  </div>
                  <div className="flex flex-col text-[12px] gap-[3px] mt-[5px]">
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
                        { Object.entries(milestone.steps).map((subMilestone, subMilestoneId) => {
                          stepOrder++;
                          return (
                            <div key={`${subMilestoneId}`} className="flex-1 border-1 border-green-500">
                              {stepOrder < Object.keys(milestone.).length ? 
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
