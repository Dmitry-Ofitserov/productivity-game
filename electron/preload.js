// electron/preload.js
const { contextBridge, ipcRenderer } = require('electron');

// This log appears in the **Electron DevTools Console** when preload runs.
console.log('✅ preload.js loaded');

contextBridge.exposeInMainWorld('electronAPI', {
  getTable: () => ipcRenderer.invoke('get-table'),
  getKanban: () => ipcRenderer.invoke('get-kanban'),
  getGoals: () => ipcRenderer.invoke('get-goals'),
  getTasks: () => ipcRenderer.invoke('get-tasks'),
  getUser: (id) => ipcRenderer.invoke('get-user', id),
  getMilestones: () => ipcRenderer.invoke('get-milestones'),
  getSteps: () => ipcRenderer.invoke('get-steps'),
  getTags: () => ipcRenderer.invoke('get-tags'),
});