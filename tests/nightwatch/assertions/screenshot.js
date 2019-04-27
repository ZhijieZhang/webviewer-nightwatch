const Jimp = require('jimp');
const path = require('path');
const readline = require('readline');
const fs = require('fs');
const { promisify } = require('util');
const stat = promisify(fs.stat);
const rename = promisify(fs.rename);
const mkdir = promisify(fs.mkdir);
const rmdir = promisify(fs.rmdir);

const RESET = '\x1b[0m';
const RED = '\x1b[31m';
const GREEN = '\x1b[32m'
const YELLOW = '\x1b[33m'
const CYAN = '\x1b[36m';
const baseFolderPath = path.resolve(__dirname, '../release/screenshot/baseline');
const diffFolderPath = path.resolve(__dirname, '../release/screenshot/diff');
const currentFolderPath = path.resolve(__dirname, '../release/screenshot/current');

exports.assertion = function(
  element, 
  filename, 
  message
) {
  this.message = message || `Screenshot test for ${element} failed.`
  
  this.expected = true;

  this.pass = function(value) {
    return value === true;
  }

  this.value = function(result) {
    return result;
  }

  this.command = function(callback) {
    let currentScreenshot;

    this.api
      .captureElementScreenshot(element, function(screenshot) {
        currentScreenshot = screenshot;
      })
      .perform(async function(done) {
        const baseFilePath = path.resolve(baseFolderPath, filename);
        const diffFilePath = path.resolve(diffFolderPath, filename);
        const currentFilePath = path.resolve(currentFolderPath, filename);

        try {
          await stat(baseFilePath);
          const baseScreenshot = await Jimp.read(baseFilePath);
          const diff = Jimp.diff(currentScreenshot, baseScreenshot);
        
          if (diff.percent === 0) {
            callback(true);
          } else {
            await currentScreenshot.writeAsync(currentFilePath);
            await diff.image.writeAsync(diffFilePath);
            await promptOverwrite(baseFilePath, diffFilePath, currentFilePath);
            callback(false);
          }
        } catch(error) {
          console.log(error);
          await currentScreenshot.writeAsync(baseFilePath);
          console.log(`${filename} doesn't exist, saved the current screenshot as a baseline screenshot`);
          callback(true);
        }

        done();
      });
    
    return this;
  }
}

function promptOverwrite(baseFilePath, diffFilePath, currentFilePath) {
  return new Promise(function(resolve) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question(`
      ${RED}Current screenshot doesn't match the baseline
      Current screenshot: ${currentFilePath}${RESET}
      ${GREEN}Baseline screenshot: ${baseFilePath}${RESET}
      ${YELLOW}Diff screenshot: ${diffFilePath}${RESET}
      ${CYAN}Do you want to overwrite the baseline screenshot with the current screenshot? (y/n)
    `, function(answer) {
      rl.close();
      console.log(answer);
      if (answer.toUpperCase() === 'Y') {
        rename(baseFilePath, currentFilePath).then(resolve);
      } 
    })
  }) 
}