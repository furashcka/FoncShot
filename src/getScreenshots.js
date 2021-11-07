const _ = require("lodash");
const { desktopCapturer } = require("electron");

module.exports = async function getScreenshots() {
  let maxSizeScreen = getBiggerScreen();
  let { width, height } = maxSizeScreen.size;
  let sources = await desktopCapturer.getSources({
    types: ["screen"],
    thumbnailSize: { width, height },
  });

  return _.map(sources, ({ thumbnail }) => ({
    size: thumbnail.getSize(),
    data: thumbnail.toDataURL(),
  }));
};

function getBiggerScreen() {
  const { screen } = require("electron");

  return _.maxBy(screen.getAllDisplays(), ({ size }) => {
    return size.width + size.height;
  });
}
