"use client";
import { useEffect, useState } from "react";
import chroma from 'chroma-js';
import Image from "next/image";

import { BigSolvedTickMark, BigUnsolvedTickMark, SmallSolvedTickMark, SmallUnsolvedTickMark } from '../assets/tick-marks'
import Table from "@/components/main-page/Table";
import Kanban from "@/components/main-page/Kanban";
import Goals from "@/components/main-page/Goals";


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
        <Kanban/>
        <Goals/>
      </div>
    </div>
  );
}
