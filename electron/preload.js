// electron/preload.js
const { contextBridge, ipcRenderer } = require('electron');

// This log appears in the **Electron DevTools Console** when preload runs.
console.log('✅ preload.js loaded');

contextBridge.exposeInMainWorld('electronAPI', {
  // test helpers
  ping: () => 'pong',
  fetchTogglData: (config) => ipcRenderer.invoke('fetch-toggl-data', config),
  readTable: async () => {
    // Keep it minimal here; you can implement fs read inside preload if you prefer.
    return ipcRenderer.invoke('read-table'); // optional; you can also expose FS directly
  },
  addUser: (name) => ipcRenderer.invoke('add-user', name),
  getUsers: () => ipcRenderer.invoke('get-users')
});
