export default function Kanban() {
    const DOWMap = ["Daily tasks", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", 'Pile'];
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
    return (
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
    )
}