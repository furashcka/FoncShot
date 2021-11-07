const { ipcRenderer } = require("electron");

ipcRenderer.on("rerender", function (event, { screenshots }) {
  console.log("screenshots", screenshots);
});
