// electron/main.js
const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');
const fsp = require('fs').promises;
const https = require('https');

// Store the db file inside your app folder (userData directory is safer)
const dbPath = path.join(app.getPath('userData'), 'app.db');

// Open (or create if it doesn't exist)
const db = new Database(dbPath);
console.log('SQLite database ready at:', dbPath);

// ----------------- HARDCODED CREDENTIALS (per your request) -----------------
const HARD_CODED_API_TOKEN = '47391e652b123f0e66882dd1311b63';
const HARD_CODED_WORKSPACE_ID = '736672';

// --------------------- Basic debug / env info ---------------------
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('process.defaultApp:', process.defaultApp);
console.log('process.execPath:', process.execPath);
console.log('electron path test:', /[\\/]electron[\\/]/.test(process.execPath));

// isDev detection
const isDev = (
  process.env.NODE_ENV === 'development' ||
  process.defaultApp ||
  /[\\/]electron[\\/]/.test(process.execPath)
);
console.log('Computed isDev:', isDev);

// preload and save paths
const preloadPath = path.resolve(__dirname, 'preload.js');
console.log('Computed preload path:', preloadPath);
console.log('Preload exists?', fs.existsSync(preloadPath));

const savePath = path.join(__dirname, '../saveFiles/table.json');
console.log('Save path (table.json):', savePath);

// --------------------- Helper functions ---------------------

/**
 * fetchAllTogglData({ apiToken, workspaceId, startDate, endDate })
 * - returns parsed JSON (raw Toggl reports response)
 */
function fetchAllTogglData({ apiToken, workspaceId, startDate, endDate }) {
  return new Promise((resolve, reject) => {
    const queryParams = new URLSearchParams({
      workspace_id: workspaceId,
      since: startDate,
      until: endDate,
      user_agent: 'electron-app'
    });

    const options = {
      hostname: 'api.track.toggl.com',
      path: `/reports/api/v2/details?${queryParams}`,
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(apiToken + ':api_token').toString('base64'),
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            resolve(JSON.parse(data));
          } catch (parseErr) {
            reject(new Error('Failed to parse JSON response from Toggl: ' + String(parseErr)));
          }
        } else {
          reject(new Error(`API returned status ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', (err) => reject(err));
    req.end();
  });
}

/**
 * ensureSaveFile() - guarantees savePath exists (creates [] if not)
 */
async function ensureSaveFile() {
  try {
    await fsp.access(savePath);
    return true;
  } catch {
    await fsp.writeFile(savePath, JSON.stringify([], null, 2), 'utf8');
    console.log('ensureSaveFile: created empty save file at', savePath);
    return false;
  }
}

// --------------------- Electron window lifecycle ---------------------
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

// --------------------- IPC handlers (top-level, single registration) ---------------------

/**
 * fetch-toggl-data
 * Uses HARD_CODED_API_TOKEN and HARD_CODED_WORKSPACE_ID (hardcoded)
 * You can still pass startDate/endDate in the config; apiToken/workspaceId are ignored & hardcoded.
 */
ipcMain.handle('fetch-toggl-data', async (event, config = {}) => {
  console.log('fetch-toggl-data: invoked (USING HARDCODED CREDENTIALS). Received config:', {
    startDate: config.startDate,
    endDate: config.endDate
  });

  // Ensure the save file exists
  await ensureSaveFile();

  // Use hardcoded credentials
  const apiToken = HARD_CODED_API_TOKEN;
  const workspaceId = HARD_CODED_WORKSPACE_ID;
  const startDate = config.startDate;
  const endDate = config.endDate;

  if (!apiToken || !workspaceId) {
    console.error('fetch-toggl-data: missing hardcoded credentials');
    return { success: false, error: 'Missing hardcoded credentials' };
  }

  try {
    const data = await fetchAllTogglData({ apiToken, workspaceId, startDate, endDate });
    console.log('fetch-toggl-data: fetched type=', typeof data, 'isArray=', Array.isArray(data));

    // Normalize: prefer the inner .data array if Toggl wraps
    const toSave = Array.isArray(data) ? data : (data && data.data ? data.data : data);
    const finalSave = Array.isArray(toSave) ? toSave : (toSave ? [toSave] : []);

    await fsp.writeFile(savePath, JSON.stringify(finalSave, null, 2), 'utf8');
    console.log(`fetch-toggl-data: wrote ${Array.isArray(finalSave) ? finalSave.length : 0} entries to`, savePath);

    return { success: true, filename: savePath, count: Array.isArray(finalSave) ? finalSave.length : undefined };
  } catch (err) {
    console.error('fetch-toggl-data: error during fetch', err && err.message ? err.message : err);

    // fallback: read existing saved data if available
    try {
      const existing = await fsp.readFile(savePath, 'utf8');
      const parsed = JSON.parse(existing);
      return { success: false, error: err && err.message ? err.message : String(err), filename: savePath, existing: parsed };
    } catch (readErr) {
      console.error('fetch-toggl-data: also failed to read existing file', readErr);
      return { success: false, error: err && err.message ? err.message : String(err) };
    }
  }
});

/**
 * read-table
 * Reads savePath and returns parsed JSON (or [] on any error)
 */
ipcMain.handle('read-table', async () => {
  try {
    await ensureSaveFile();
    console.log('read-table: reading file ->', savePath);
    const content = await fsp.readFile(savePath, 'utf8');
    try {
      const parsed = JSON.parse(content);
      console.log('read-table: parsed ok, isArray=', Array.isArray(parsed), 'length=', Array.isArray(parsed) ? parsed.length : 'n/a');
      return parsed ?? [];
    } catch (parseErr) {
      console.error('read-table: JSON parse error', parseErr);
      return [];
    }
  } catch (err) {
    console.error('read-table: failed to read file', err);
    return [];
  }
});

ipcMain.handle('add-user', (event, name) => {
  const stmt = db.prepare('INSERT INTO users (name) VALUES (?)');
  stmt.run(name);
  return { success: true };
});

ipcMain.handle('get-users', () => {
  return db.prepare('SELECT * FROM users').all();
});

// --------------------- end of file ---------------------
