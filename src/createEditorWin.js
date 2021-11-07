const _ = require("lodash");
const { BrowserWindow } = require("electron");

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
      devTools: true,
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

  // hide window
  win.setSize(0, 0, false);
  win.setPosition(-width, -height, false);

  // for disable minimize/maximize animation
  win.show();
  win.hide();

  return {
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
