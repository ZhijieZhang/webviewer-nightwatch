const Jimp = require('jimp');
const path = require('path');
const readline = require('readline');
const fs = require('fs');
const { promisify } = require('util');
const getBrowserName = require('../utils/getBrowserName');
const isRunningLocally = require('../utils/isRunningLocally');

const stat = promisify(fs.stat);
const copyFile = promisify(fs.copyFile);
const unlink = promisify(fs.unlink);

exports.assertion = function (element, filename, message) {
  this.message = message || `Screenshot test for ${element} failed.`;

  this.expected = true;

  this.pass = function (value) {
    return value;
  };

  this.value = function (result) {
    return result;
  };

  this.command = function (callback) {
    this.api
      .captureElementScreenshot(element, async function (currentScreenshot) {
        const browserName = getBrowserName(this);
        const baseFilePath = path.resolve(__dirname, '../screenshot/', browserName, 'baseline', filename);
        const diffFilePath = path.resolve(__dirname, '../screenshot/', browserName, 'diff', filename);
        const currentFilePath = path.resolve(__dirname, '../screenshot/', browserName, 'current', filename);

        try {
          await stat(baseFilePath);
          const baseScreenshot = await Jimp.read(baseFilePath);
          let diff;

          if (
            baseScreenshot.bitmap.height === currentScreenshot.bitmap.height &&
            baseScreenshot.bitmap.width === currentScreenshot.bitmap.width
          ) {
            diff = Jimp.diff(currentScreenshot, baseScreenshot);
          } else {
            const height = Math.min(baseScreenshot.bitmap.height, currentScreenshot.bitmap.height);
            const width = Math.min(baseScreenshot.bitmap.width, currentScreenshot.bitmap.width);
            diff = Jimp.diff(
              currentScreenshot.clone().resize(height, width),
              baseScreenshot.clone().resize(height, width)
            );
          }
          
          if (diff.percent === 0) {
            callback(true);
          } else {
            console.log(diff.percent);
            await currentScreenshot.writeAsync(currentFilePath);
            await diff.image.writeAsync(diffFilePath);
            const hasOverwritten = isRunningLocally(this) 
                                  ? await promptOverwrite(baseFilePath, diffFilePath, currentFilePath)
                                  : false;
            // if we overwrite the baseline screenshot then this assertion should pass because we wanted to update it
            callback(hasOverwritten);
          }
        } catch (error) {
          await currentScreenshot.writeAsync(baseFilePath);
          console.log(`${filename} doesn't exist, saved the current screenshot as a baseline screenshot`);
          callback(true);
        }
      });

    return this;
  };
};

function promptOverwrite(baseFilePath, diffFilePath, currentFilePath) {
  const RESET = '\x1b[0m';
  const RED = '\x1b[31m';
  const GREEN = '\x1b[32m';
  const YELLOW = '\x1b[33m';
  const CYAN = '\x1b[36m';

  return new Promise(function (resolve) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question(
      `\
      ${RED}Current screenshot doesn't match the baseline
      Current screenshot: ${currentFilePath}${RESET}
      ${GREEN}Baseline screenshot: ${baseFilePath}${RESET}
      ${YELLOW}Diff screenshot: ${diffFilePath}${RESET}
      ${CYAN}Do you want to overwrite the baseline screenshot with the current screenshot? (y/n)
    `,
      async function (answer) {
        rl.close();

        if (answer.toUpperCase() === 'Y') {
          await unlink(baseFilePath);
          copyFile(currentFilePath, baseFilePath).then(function () {
            resolve(true);
          });
        } else {
          resolve(false);
        }
      }
    );
  });
}
