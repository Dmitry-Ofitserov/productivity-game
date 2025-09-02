import chroma from "chroma-js";
import TableCell from "../elements/TableCell";
import { useTableStore } from "@/stores/useTableStore";
import { useTasksStore } from "@/stores/useTasksStore";
import { useGoalsStore } from "@/stores/useGoalsStore";


function isFirstDayOfSeason(date: Date) {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return (month%3 === 0 && day === 1);
}

function isFirstDowOfSeason(date: Date) {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return (month%3 === 0 && day <= 7 && day > 1);
}

function numberToColor(value: number): string {
  const min = 0;
  const max = 10;
  const clamped = Math.min(Math.max(value, min), max);
  if (value >= 10) {
    // Special gradient case
    return "linear-gradient(to bottom right, #FF0000, #FFFF00)";
  }
  const scale = chroma.scale(["#000000", "#66F669"]).domain([min, max]);

  return scale(clamped).hex();
}

export function dateToIso(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

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
    //const { table, setTable, tasks, goals } = useAppContext();
    const table = useTableStore((state) => state.table);

    const tasks = useTasksStore((state) => state.tasks);
    const goals = useGoalsStore((state) => state.goals);

    let startDOW = calculateStartDay(2028);
    let date = new Date(2028, 0, 1);
    let daysCount = 0;
  
    let startDOW2 = calculateStartDay(2025);
    let date2 = new Date(2025, 0, 1);
    let daysCount2 = 0;
    return (
      <div className="bg-[#000000]">
        <div 
        className="m-[2px] aspect-158/14 grid grid-cols-[repeat(158, 1fr)] grid-rows-[repeat(158, 1fr)]">
        {Array.from({ length: 158 }).flatMap((_, column) => 
          Array.from({ length: 7}).map((_, row) => {
            if (daysCount !== 0 || row >= startDOW) {
              daysCount++;
              date = new Date(2028, 0, 1);
              date.setDate(daysCount);
            

            const isoDate = dateToIso(date);
            const hours = table[isoDate]?.hours;
            const points = table[isoDate]?.points;
            const cellColor = hours != null? numberToColor(hours): "#000000";

            let borders = "";

            if (isLastDayOfMonth(date) || daysCount === 0 && startDOW - row === 1)
              {borders = "border-r-[1px] border-b-[1px]"}
            else if (isLastDOWInMonth(date) || daysCount === 0 && startDOW - row > 1) 
              {borders = "border-r-[1px]"}

            if (isFirstDayOfSeason(date) && date.getDay() !== 1)
              {borders += " border-l-[1px] border-t-[1px]"}

            if (daysCount < 8 || isFirstDayOfSeason(date) && date.getDay() === 1 || isFirstDowOfSeason(date))
              {borders += " border-l-[1px]"}
            if (row === 6 && column !== 157)
              {borders += " border-b-[1px]"}
            if (daysCount === 1 || row === 0)
              {borders += " border-t-[1px]"}

            if ([2029, 2030].includes(date.getFullYear()) && date.getMonth() === 0 && date.getDate() === 1 && date.getDay() !== 1)
              {borders += " border-t-[1px] border-t-red-500"}
            if ([2029, 2030].includes(date.getFullYear()) && date.getMonth() === 0 && date.getDate() <= 7)
              {borders += " border-l-[1px] border-l-red-500"}
            if ([2028, 2029].includes(date.getFullYear()) && date.getMonth() === 11 && date.getDate() === 31 && date.getDay() !== 0)
              {borders += " border-b-[1px] border-b-red-500"}
            if ([2028, 2029].includes(date.getFullYear()) && date.getMonth() === 11 && date.getDate() >= 25)
              {borders += " border-r-[1px] border-r-red-500"}

            return (
              <TableCell
              key={isoDate}
              isoDate={isoDate}
              column={column}
              row={row}
              cellColor={cellColor}
              points={points}
              borders={borders}
              table={table}
              tasks={tasks}
            />
          )}})
        )}
        {Array.from({ length: 158 }).flatMap((_, column) => 
          Array.from({ length: 7}).map((_, row) => {
            if (daysCount2 !== 0 || row >= startDOW2) {
              daysCount2++;
              date2 = new Date(2025, 0, 1);
              date2.setDate(daysCount2);
              
              const isoDate = dateToIso(date2);
              const hours = table[isoDate]?.hours;
              const points = table[isoDate]?.points;
              const cellColor = hours != null? numberToColor(hours): "#000000";

              let borders = "";

              if (isLastDayOfMonth(date2) || daysCount2 === 0 && startDOW2 - row === 1)
                {borders = "border-r-[1px] border-b-[1px]"}
              else if (isLastDOWInMonth(date2) || daysCount2 === 0 && startDOW2 - row > 1) 
                {borders = "border-r-[1px]"}
              
              if (isFirstDayOfSeason(date2) && date2.getDay() !== 1)
                {borders += " border-l-[1px] border-t-[1px]"}

              if (daysCount2 < 8 || isFirstDayOfSeason(date2) && date2.getDay() === 1 || isFirstDowOfSeason(date2))
                {borders += " border-l-[1px]"}
              if (row === 6 && daysCount2 < 1095)
                {borders += " border-b-[1px]"}
              if (daysCount2 === 1)
                {borders += " border-t-[1px]"}

              if ([2026, 2027].includes(date2.getFullYear()) && date2.getMonth() === 0 && date2.getDate() === 1 && date2.getDay() !== 1)
                {borders += " border-t-[1px] border-t-red-500"}
              if ([2026, 2027].includes(date2.getFullYear()) && date2.getMonth() === 0 && date2.getDate() <= 7)
                {borders += " border-l-[1px] border-l-red-500"}
              if ([2025, 2026].includes(date2.getFullYear()) && date2.getMonth() === 11 && date2.getDate() === 31)
                {borders += " border-b-[1px] border-b-red-500"}
              if ([2025, 2026].includes(date2.getFullYear()) && date2.getMonth() === 11 && date2.getDate() >= 25)
                {borders += " border-r-[1px] border-r-red-500"}

              return (
                <TableCell
                  key={isoDate}
                  isoDate={isoDate}
                  column={column}
                  row={row+7}
                  cellColor={cellColor}
                  points={points}
                  borders={borders}
                  table={table}
                  tasks={tasks}
                />
              )
            }
          })
        )}
      </div>
    </div>
  )
}