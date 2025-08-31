// TableCell.tsx
import React from "react";
import { useTooltipContext } from "@/contexts/TooltipContext";
import { TableDataAggregated, TasksDataAggregated } from "@/contexts/AppContext";

interface TableCellProps {
  isoDate: string;
  column: number;
  row: number;
  cellColor: string;
  points?: number;
  borders: string;
  tableState: TableDataAggregated;
  tasksState: TasksDataAggregated;
}

export default React.memo(function TableCell({
  isoDate,
  column,
  row,
  cellColor,
  points,
  borders,
  tableState,
  tasksState,
}: TableCellProps) {
  const { setTooltipContentState } = useTooltipContext(); 

  const handleMouseEnter = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const centerX = rect.left + 5;
      const screenCenter = window.innerWidth / 2;
      const position = centerX < screenCenter ? "right" : "left";
  
      setTooltipContentState(prev => {
        if (prev.sticky) return prev;
  
        let tooltipContent: any = {
          title: isoDate,
          position,
          sticky: false,
          tasks: {},
        };
  
        if (tableState[isoDate] != null) {
          Object.entries(tableState[isoDate].tasks).forEach(([taskIdKey, task]) => {
            const taskId = Number(taskIdKey);
            tooltipContent.tasks[taskId] = {
              hours: task.hours,
              points: task.points,
              endTime: task.endTime,
            };
          });
        }
        return tooltipContent;
      });
    },
    [isoDate, tableState, tasksState, setTooltipContentState]
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
      data-date={isoDate}
      className={`${borders} relative hover:scale-150 transition-transform duration-20`}
      style={{
        gridColumn: `${column + 1} / span 1`,
        gridRow: `${row + 1} / span 1`,
        background: cellColor,
      }}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={`main-page/hour-marks/${Math.min(Math.floor((points ?? 0) / 2), 7)}.svg`}
        className="absolute inset-0 m-auto"
        style={{ transform: "scale(0.7)" }}
        alt=""
      />
    </button>
  );
});
