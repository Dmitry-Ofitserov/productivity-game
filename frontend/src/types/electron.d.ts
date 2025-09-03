// electron/electron.d.ts
export interface IElectronAPI {
  getTable: () => Promise<any[]>; // Replace `any[]` with your actual table data type
  getKanban: () => Promise<any[]>; // Replace `any` with your actual kanban data type
  getGoals: () => Promise<any[]>; // Replace `any` with your actual goals data type
  getTasks: () => Promise<any[]>; // Replace `any` with your actual tasks data type
  getUser: (id: number | string) => Promise<any>; // Replace `any` with your actual user data type
  getMilestones: () => Promise<any[]>;
  getSteps: () => Promise<any[]>;
  getTags: () => Promise<any[]>;
  updateTaskMs: (taskId: number, ms: number) => Promise<any>;
  updateTaskIsSolved: (taskId: number, isSolved: number) => Promise<any>;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}