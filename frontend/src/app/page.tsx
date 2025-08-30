"use client";
import { useEffect, useState } from "react";
import chroma from 'chroma-js';

import Table from "@/components/main-page/Table";
import Kanban from "@/components/main-page/Kanban";
import Goals from "@/components/main-page/Goals";


export type TableDataAggregated = {
  [date: string]: {
    points: number,
    hours: number,
    taskIds: number[]
  }
}

export type KanbanDataAggregated = {
  [kanbanId: number]: number[];
}

export type TasksDataAggregated = {
  [taskId: number]: {
    description: string,
    points: number,
    duration: number,
    endTime: string,
    isSolved: number | null,
    stepId: number

  }
}

export type GoalDataAggregated = {
  id: number;
  title: string;
  currentLevel: number;
  color: string;
  points: number;
  hours: number;
  milestones: MilestoneDataAggregated[];
}

export type MilestoneDataAggregated = {
  id: number;
  description: string;
  points: number;
  hours: number;
  steps: StepData[];
}

export type StepData = {
  id: number;
  description: string;
  points: number;
  hours: number;
}

export default function Home() {
  useEffect(() => {
    console.log("electronAPI in renderer:", window.electronAPI);
  })

  const [ tableState, setTableState ] = useState<TableDataAggregated>({});
  const [ kanbanState, setKanbanState ] = useState<KanbanDataAggregated>({});
  const [ goalsState, setGoalsState ] = useState<GoalDataAggregated[]>([]);
  const [ tasksState, setTasksState ] = useState<TasksDataAggregated>({});


  useEffect(() => {
    console.log("start loading db data");
    const loadData = async () => {
      try {
        const tableData = await window.electronAPI.getTable();
        const tasksData = await window.electronAPI.getTasks();
        const kanbanData = await window.electronAPI.getKanban();
        const goalsData = await window.electronAPI.getGoals();
        const milestonesData = await window.electronAPI.getMilestones();
        const stepsData = await window.electronAPI.getSteps();
        const tagsData = await window.electronAPI.getTags();
        const userData = await window.electronAPI.getUser(1);
        console.log("tableData", tableData);
        console.log("tasksData", tasksData);
        console.log("kanbanData", kanbanData);
        console.log("goalsData", goalsData);
        console.log("milestonesData", milestonesData);
        console.log("stepsData", stepsData);
        console.log("tagsData", tagsData);
        console.log("userData", userData);

        const tableDataAggregated = tableData.reduce<TableDataAggregated>((acc, row) => {
          if (!acc[row.date]) acc[row.date] = {points: 0, hours: 0, taskIds: []};
          acc[row.date].hours += row.hours;
          acc[row.date].points += row.points;
          acc[row.date].taskIds.push(row.task_id);
          return acc;
        }, {})
        setTableState(tableDataAggregated);
        console.log("tableDataAggregated: ", tableDataAggregated);

        const kanbanDataAggregated = kanbanData.reduce<KanbanDataAggregated>((acc, row) => {
          if (!acc[row.id]) acc[row.id] = [];
          acc[row.id][row.task_position] = row.task_id;
          return acc
        }, {})
        setKanbanState(kanbanDataAggregated);
        console.log("kanbanDataAggregated ", kanbanDataAggregated);
        
        const tasksDataAggregated = tasksData.reduce<TasksDataAggregated>((acc, row) => {
          if (!acc) acc = {};
          acc[row.id] = {
            description: row.description,
            points: row.points,
            duration: row.duration,
            endTime: row.end_time,
            isSolved: row.isSolved,
            stepId: row.step_id
          };
          return acc;
        }, {})
        setTasksState(tasksDataAggregated);
        console.log("tasksDataAggregates: ", tasksDataAggregated);

        let goalsDataAggregated = goalsData.reduce<GoalDataAggregated[]>((goalsAcc, rowGoal) => {
          goalsAcc[rowGoal.position] = {
            id: rowGoal.id,
            title: rowGoal.title,
            currentLevel: rowGoal.current_level,
            color: rowGoal.color,
            points: 0,
            hours: 0,
            milestones: milestonesData.reduce<MilestoneDataAggregated[]>((milestonesAcc, rowMilestone) => {
              if (rowMilestone.goal_id === rowGoal.id ) milestonesAcc[rowMilestone.position] = {
                id: rowMilestone.id,
                description: rowMilestone.description,
                points: 0,
                hours: 0,
                steps: stepsData.reduce<StepData[]>((stepsAcc, rowSteps) => {
                  if (rowSteps.milestone_id === rowMilestone.id) stepsAcc[rowSteps.position] = {
                    id: rowSteps.id,
                    description: rowSteps.description,
                    points: 0,
                    hours: 0,
                  };
                  return stepsAcc;
                }, [])
              };
              return milestonesAcc;
            }, [])
          };
          return goalsAcc;
        }, [])
        for (let goalPosition = 0; goalPosition < goalsDataAggregated.length; goalPosition++) {
          const goal = goalsDataAggregated[goalPosition];
          for (let milestonePosition = 0; milestonePosition < goalsDataAggregated[goalPosition].milestones.length; milestonePosition++) {
            const milestone = goalsDataAggregated[goalPosition].milestones[milestonePosition];
            for (let stepPosition = 0; stepPosition < goalsDataAggregated[goalPosition].milestones[milestonePosition].steps.length; stepPosition++) {
              const step = goalsDataAggregated[goalPosition].milestones[milestonePosition].steps[stepPosition];
              Object.entries(tasksDataAggregated).map(([taskId, task]) => {
                if (task.stepId === step.id) {
                  step.hours += task.duration;
                  step.points += task.points;
                }
              });
              milestone.hours += step.hours;
              milestone.points += step.points;
            };
            goal.hours += milestone.hours;
            goal.points += milestone.points;
          }
        }
        setGoalsState(goalsDataAggregated);
        console.log("goalsDataAggregated: ", goalsDataAggregated);


      } catch (error) {
        console.error(error);
      }
    }
    loadData();
    
  }, [])

  return (
    <div className="flex flex-col h-screen">
      <Table
        tableState={tableState}
        setTableState={setTableState}
        tasksState={tasksState}
        goalsState={goalsState}
      />
      <div className="flex-1 flex flex-col">
        <Kanban
          tasksState={tasksState}
          setTasksState={setTasksState}
          kanbanState={kanbanState}
          setKanbanState={setKanbanState}
          goalsState={goalsState}
        />
        <Goals
          tasksState={tasksState}
          goalsState={goalsState}
          setGoalsState={setGoalsState}
        />
      </div>
    </div>
  );
}
