const { app, BrowserWindow } = require("electron");

app.on("ready", () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    skipTaskbar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      devTools: true,
    },
    frame: false,
    resizable: false,
    enableLargerThanScreen: true,
    movable: false,
    alwaysOnTop: true,
  });
});
