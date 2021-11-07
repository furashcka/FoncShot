const _ = require("lodash");
const path = require("path");
const {
  app,
  BrowserWindow,
  Tray,
  Menu,
  nativeImage,
  dialog,
  globalShortcut,
} = require("electron");

const createEditorWin = require("./createEditorWin.js");

app.on("ready", () => {
  const win = new BrowserWindow({ show: false });
  const iconPath = path.join(__dirname, "../img/tray.png");
  const icon = nativeImage.createFromPath(iconPath);
  const tray = new Tray(icon);
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Take a screenshot",
      click: () => editorWin.maximize(),
    },
    {
      label: "Options...",
      click: notCreatedDialog,
    },
    {
      label: "About...",
      click: notCreatedDialog,
    },
    {
      label: "Exit",
      click: () => app.quit(),
    },
  ]);
  const editorWin = createEditorWin();

  tray.setContextMenu(contextMenu);
  tray.setTitle("Take a screenshot");
  tray.setToolTip("Take a screenshot");
  tray.on("click", () => editorWin.maximize());

  globalShortcut.register("PrintScreen", () => editorWin.maximize());
  globalShortcut.register("Esc", () => editorWin.minimize());

  win.tray = tray;
});

function notCreatedDialog() {
  dialog.showMessageBox(null, {
    title: "FoncShot",
    message: "Not created yet",
  });
}
