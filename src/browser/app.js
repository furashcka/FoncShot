const _ = require("lodash");
const { ipcRenderer } = require("electron");
const canvasElement = document.querySelector("#canvas");
const ctx = canvasElement.getContext("2d");

ipcRenderer.on("rerender", function (e, { screenshots }) {
  _.each(screenshots, ({ base64 }, i) => {
    let img = new Image();

    img.onload = () => {
      let offset = _.get(screenshots, `[${i - 1}].width`, 0);
      ctx.drawImage(img, offset, 0);
    };
    img.src = base64;
  });
});
