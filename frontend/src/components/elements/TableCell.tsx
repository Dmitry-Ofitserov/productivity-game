// TableCell.tsx
import { TableDataAggregated, useTableStore } from "@/stores/useTableStore";
import { TasksDataAggregated } from "@/stores/useTasksStore";
import { useTooltipDataStore } from "@/stores/useTooltipStore";
import React from "react";

interface TableCellProps {
  isoDate: string;
  column: number;
  row: number;
  cellColor: string;
  points?: number;
  borders: string;
  table: TableDataAggregated;
  tasks: TasksDataAggregated;
}

export default React.memo(function TableCell({
  isoDate,
  column,
  row,
  cellColor,
  points,
  borders,
  table,
  tasks,
}: TableCellProps) {
  //const { setTooltipData } = useTooltipContext(); 
  const setTooltipData = useTooltipDataStore((state) => state.setTooltipData);
  const tableCellByDate = useTableStore((state) => state.table[isoDate]);
  const handleMouseEnter = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const centerX = rect.left + 5;
      const screenCenter = window.innerWidth / 2;
      const position = centerX < screenCenter ? "right" : "left";
  
      setTooltipData(prev => {
        if (prev.sticky) return prev;
  
        let tooltipContent: any = {
          title: isoDate,
          position,
          sticky: false,
          tasks: {},
        };
  
        if (tableCellByDate != null) {
          Object.entries(tableCellByDate.tasks).forEach(([taskIdKey, task]) => {
            const taskId = Number(taskIdKey);
            tooltipContent.tasks[taskId] = {
              ms: task.ms,
              points: task.points,
              endTime: task.endTime,
            };
          });
        }
        return tooltipContent;
      });
    },
    []
  );

  const handleClick = React.useCallback(() => {
    setTooltipData((prev) => ({ ...prev, sticky: !prev.sticky }));
  }, []);

  const handleMouseLeave = React.useCallback(() => {
    setTooltipData((prev) =>
      prev.sticky ? prev : { title: "", position: "", sticky: false, tasks: {} }
    );
  }, []);

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
