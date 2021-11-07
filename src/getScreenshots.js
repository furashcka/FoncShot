const _ = require("lodash");
const fs = require("fs");
const screenshot = require("screenshot-desktop");
const { nativeImage } = require("electron");

module.exports = async function getScreenshots() {
  let displays = await screenshot.listDisplays();
  let promises = _.map(displays, ({ id }) => {
    return screenshot({ screen: id, format: "png" });
  });
  let screenshots = await Promise.all(promises);

  return _.map(displays, ({ width, height }, i) => {
    let base64 =
      "data:image/png;base64," + Buffer.from(screenshots[i]).toString("base64");

    return {
      width,
      height,
      base64,
    };
  });
};
