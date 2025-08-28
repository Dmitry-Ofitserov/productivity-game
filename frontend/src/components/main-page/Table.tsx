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

export default function Table() {
    let startDOW = calculateStartDay(2028);
    let date = new Date(2026, 0, 1);
    let daysCount = 0;
  
    let startDOW2 = calculateStartDay(2025);
    let date2 = new Date(2023, 0, 1);
    let daysCount2 = 0;
    return (
      <div className="bg-[#000000]">
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
  )
}