import { BigSolvedTickMark, BigUnsolvedTickMark, SmallSolvedTickMark, SmallUnsolvedTickMark } from '../../assets/tick-marks'


export default function Goals() {
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
    return (
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
    )
}