const path = require("path");
const _ = require("lodash");
const { BrowserWindow, clipboard, nativeImage, ipcMain } = require("electron");
const getScreenshots = require("./getScreenshots.js");

module.exports = function createEditorWin() {
  const { screen } = require("electron");
  const displays = screen.getAllDisplays();
  const width = _.sumBy(displays, ({ size }) => size.width);
  const height = _.maxBy(displays, ({ size }) => size.height).size.height;
  const win = new BrowserWindow({
    width: 0,
    height: 0,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
    },
    skipTaskbar: true,
    alwaysOnTop: true,
    enableLargerThanScreen: true,
    frame: false,
    resizable: false,
    movable: false,
  });

  win.loadFile(path.join(__dirname, "browser/app.html"));

  // hide window
  win.setSize(0, 0, false);
  win.setPosition(-width, -height, false);

  // for disable minimize/maximize animation
  win.show();
  win.hide();

  ipcMain.on("fetchSnapshotResult", (e, base64) => {
    let img = nativeImage.createFromDataURL(base64);

    clipboard.writeImage(img);
  });

  return {
    win,
    rerender: async () => {
      let screenshots = await getScreenshots();

      // win.webContents.openDevTools();
      win.webContents.send("rerender", {
        screenshots,
      });
    },

    copyToClipboard: () => {
      win.webContents.send("fetchSnapshot");
    },

    minimize: () => {
      win.setSize(0, 0, false);
      win.setPosition(-width, -height, false);
      win.hide();
    },

    maximize: () => {
      win.setSize(width, height, false);
      win.setPosition(0, 0, false);
      win.show();
    },
  };
};
