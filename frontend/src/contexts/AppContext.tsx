'use client'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

export type TableDataAggregated = {
    [date: string]: {
      points: number,
      hours: number,
      tasks: {
        [taskId: number]: {
            hours: number,
            points: number,
            endTime: string,
        }
      }
    }
  }
  
export type KanbanDataAggregated = {
    [kanbanId: number]: number[];
}

export type TasksDataAggregated = {
    [taskId: number]: {
        description: string,
        points: number,
        hours: number,
        endTime: string,
        isSolved: number | null,
        stepId: number,
        milestoneId: number,
        goalId: number,
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


interface AppContextType {
    tableState: TableDataAggregated;
    setTableState: React.Dispatch<React.SetStateAction<TableDataAggregated>>;
    kanbanState: KanbanDataAggregated;
    setKanbanState: React.Dispatch<React.SetStateAction<KanbanDataAggregated>>;
    goalsState: GoalDataAggregated[];
    setGoalsState: React.Dispatch<React.SetStateAction<GoalDataAggregated[]>>;
    tasksState: TasksDataAggregated;
    setTasksState: React.Dispatch<React.SetStateAction<TasksDataAggregated>>;
}


interface AppProviderProps {
    children: ReactNode;
}



const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: AppProviderProps) => {
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
              if (!acc[row.date]) acc[row.date] = {points: 0, hours: 0, tasks: {}};
              acc[row.date].hours += row.hours;
              acc[row.date].points += row.points;
              acc[row.date].tasks[row.task_id] = {hours: row.hours, points: row.points, endTime: row.end_time}
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
                hours: row.duration,
                endTime: row.end_time,
                isSolved: row.isSolved,
                stepId: row.step_id,
                milestoneId: 0,
                goalId: 0,
              };
              return acc;
            }, {})
    
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
                      step.hours += task.hours;
                      step.points += task.points;
                      task.goalId = goalsDataAggregated[goalPosition].id;
                      task.milestoneId = goalsDataAggregated[goalPosition].milestones[milestonePosition].id;
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
            setTasksState(tasksDataAggregated);
            console.log("tasksDataAggregates: ", tasksDataAggregated);
    
    
          } catch (error) {
            console.error(error);
          }
        }
        loadData();
        
      }, [])

    return (
        <AppContext.Provider value={{ 
            tableState, setTableState,
            kanbanState, setKanbanState,
            goalsState, setGoalsState,
            tasksState, setTasksState

        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
      throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
  };

export default AppContext;