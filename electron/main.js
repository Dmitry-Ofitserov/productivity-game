// electron/main.js
const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');
const fsp = require('fs').promises;
const https = require('https');

const preloadPath = path.resolve(__dirname, 'preload.js');
const isDev = process.env.NODE_ENV === 'development';
const dbPath = isDev 
  ? path.join(process.cwd(), 'database.db')
  : path.join(app.getPath('userData'), 'productivity-game.db'); 
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    fullscreen: false,
    fullscreenable: true,
    maximized: true,
    menu: null,
    webPreferences: {
      preload: preloadPath,       // absolute path to preload.js
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false
    },
    show: false
  });

  mainWindow.removeMenu();
  mainWindow.maximize();

  // lifecycle logging
  mainWindow.webContents.on('did-start-loading', () => console.log('webContents: did-start-loading'));
  mainWindow.webContents.on('did-finish-load', () => console.log('webContents: did-finish-load'));
  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription, validatedURL) => {
    console.error('webContents: did-fail-load', { errorCode, errorDescription, validatedURL });
  });

  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }

  if (isDev) {
    const devUrl = 'http://localhost:3000';
    console.log('Attempting to load from dev server:', devUrl);
    mainWindow.loadURL(devUrl)
      .then(() => console.log('✅ Successfully loaded from dev server'))
      .catch(err => {
        console.error('❌ Failed to load from dev server:', err && err.message);
        showErrorPage(`<h2>Next.js Dev Server Not Running</h2><p>Run <code>npm run dev</code> in frontend</p>`);
      });
  } else {
    const buildPath = path.join(__dirname, '../next-app/out/index.html');
    console.log('Attempting to load from build:', buildPath);
    mainWindow.loadFile(buildPath)
      .catch(err => {
        console.error('❌ Failed to load from build files:', err && err.message);
        showErrorPage(`<h2>Build Files Not Found</h2><p>Run build first</p>`);
      });
  }

  mainWindow.once('ready-to-show', () => mainWindow.show());
  mainWindow.on('closed', () => { mainWindow = null; });

  if (!isDev) Menu.setApplicationMenu(null);
}

function showErrorPage(htmlContent) {
  const errorHtml = `<!doctype html>
  <html>
    <body style="font-family:Arial;color:#fff;background:#333;padding:30px">
      <h1>App error</h1>
      ${htmlContent}
      <p><button onclick="location.reload()">Reload</button></p>
    </body>
  </html>`;
  mainWindow.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(errorHtml)}`);
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

const db = new Database(dbPath);

const schemaPath = path.join(process.cwd(), 'schema.sql');
const schemaSql = fs.readFileSync(schemaPath, 'utf8');
db.exec(schemaSql);

ipcMain.handle('get-table', async (event) => {
  try {
    const table = db.prepare('SELECT * FROM "table"').all()
    return table;
  } catch (error) {
    throw new Error(`Database error: ${error.message}`);
  }
});

ipcMain.handle('get-tasks', async (event) => {
  try {
    const tasks = db.prepare('SELECT * FROM tasks').all()
    return tasks;
  } catch (error) {
    throw new Error(`Database error: ${error.message}`);
  }
});

ipcMain.handle('get-goals', async (event) => {
  try {
    const goals = db.prepare('SELECT * FROM goals ORDER BY position').all()
    return goals;
  } catch (error) {
    throw new Error(`Database error: ${error.message}`);
  }
});

ipcMain.handle('get-kanban', async (event) => {
  try {
    const kanban = db.prepare('SELECT * FROM kanban ORDER BY id, task_position').all()
    return kanban;
  } catch (error) {
    throw new Error(`Database error: ${error.message}`);
  }
});

ipcMain.handle('get-user', async (event, id) => {
  try {
    const user = db.prepare(`SELECT * FROM user WHERE id=${id}`).get();
    return user;
  } catch (error) {
    throw new Error(`Database error: ${error.message}`);
  }
});

ipcMain.handle('get-milestones', async (event) => {
  try {
    const milestones = db.prepare('SELECT * FROM milestones').all();
    return milestones;
  } catch (error) {
    throw new Error(`Database error: ${error.message}`);
  }
});

ipcMain.handle('get-steps', async (event) => {
  try {
    const steps = db.prepare('SELECT * FROM steps').all();
    return steps;
  } catch (error) {
    throw new Error(`Database error: ${error.message}`);
  }
});

ipcMain.handle('get-tags', async (event) => {
  try {
    const tags = db.prepare('SELECT * FROM tags').all();
    return tags;
  } catch (error) {
    throw new Error(`Database error: ${error.message}`);
  }
});