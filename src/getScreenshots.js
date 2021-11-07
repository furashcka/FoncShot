const _ = require("lodash");
const screenshot = require("screenshot-desktop");

module.exports = async function getScreenshots() {
  let displays = await screenshot.listDisplays();
  let promises = _.map(displays, ({ id }) => {
    return screenshot({ screen: id, format: "jpeg" });
  });
  let screenshots = await Promise.all(promises);

  return _.map(displays, ({ width, height }, i) => ({
    width,
    height,
    data: screenshots[i],
  }));
};
