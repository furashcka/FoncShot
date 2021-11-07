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
let editorWin = null;

app.on("ready", () => {
  const win = new BrowserWindow({ show: false });
  const iconPath = path.join(__dirname, "../img/tray.png");
  const icon = nativeImage.createFromPath(iconPath);
  const tray = new Tray(icon);
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Take a screenshot",
      click: () => makeScreenshot(),
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
  editorWin = createEditorWin();

  tray.setContextMenu(contextMenu);
  tray.setTitle("Take a screenshot");
  tray.setToolTip("Take a screenshot");
  tray.on("click", () => makeScreenshot());

  globalShortcut.register("PrintScreen", () => makeScreenshot());
  globalShortcut.register("Esc", () => editorWin.minimize());

  editorWin.win.on("focus", () => {
    globalShortcut.register("Ctrl+C", () => {
      editorWin.copyToClipboard();
      editorWin.minimize();
    });
  });

  editorWin.win.on("blur", () => {
    globalShortcut.unregister("Ctrl+C");
  });

  win.tray = tray;
});

async function makeScreenshot() {
  await editorWin.rerender();
  editorWin.maximize();
}

function notCreatedDialog() {
  dialog.showMessageBox(null, {
    title: "FoncShot",
    message: "Not created yet",
  });
}
