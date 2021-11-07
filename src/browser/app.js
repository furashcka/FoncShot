const _ = require("lodash");
const { ipcRenderer } = require("electron");
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

ipcRenderer.on("rerender", (e, { screenshots }) => {
  _.each(screenshots, ({ base64 }, i) => {
    let img = new Image();

    img.onload = () => {
      let offset = _.get(screenshots, `[${i - 1}].width`, 0);
      ctx.drawImage(img, offset + 15, 0);
    };
    img.src = base64;
  });
});

ipcRenderer.on("fetchSnapshot", () => {
  ipcRenderer.send("fetchSnapshotResult", canvas.toDataURL());
});
