const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

/**
 * Capture a screenshot of the canvas element and save it to disk.
 */
async function getCanvasScreenshot(page,  screenshotPath) {
    const canvas = await page.locator('canvas');
    await canvas.screenshot({ path: screenshotPath });
}

/**
 * Use Python OpenCV script to find the coordinates of a template image in the canvas screenshot.
 */
function findImageInCanvas(screenshotPath, templateImagePath) {
  const result = execFileSync('python3', [
    path.resolve(__dirname, '../../../vision-engine/find_template.py'),
    screenshotPath,
    templateImagePath,
  ]);

  return JSON.parse(result.toString());
}

/**
 * Wait for an image to appear in the canvas within a timeout period.
 */
async function waitForImage(page, templateImagePath, timeout = 10000, polling = 500) {
  const start = Date.now();

  while (Date.now() - start < timeout) {
    const screenshotPath = 'canvas.png';
    await getCanvasScreenshot(page, screenshotPath);
    try {
      const result = findImageInCanvas(screenshotPath, '../' + templateImagePath);
      if (result.found) {
        return { x: result.x, y: result.y };
      }
    } catch (e) {
      // Ignore and continue
    }

    await page.waitForTimeout(polling);
  }

  throw new Error(`Timed out waiting for image: ${templateImagePath}`);
}

/**
 * Wait for an image to disappear in the canvas within a timeout period.
 */
async function waitForImageToDisappear(page, templateImagePath, timeout = 10000, polling = 500) {
  const start = Date.now();

  while (Date.now() - start < timeout) {
    const screenshotPath = 'canvas.png';
    await getCanvasScreenshot(page, screenshotPath);
    try {
      const result = findImageInCanvas(screenshotPath, '../' + templateImagePath);
      if (!result.found) {
        return true;
      }
    } catch (e) {
      // image search failed (e.g. not found), assume it's gone
      return true;
    }

    await page.waitForTimeout(polling);
  }

  throw new Error(`Timed out waiting for image: ${templateImagePath}`);
}



/**
 * Wait for an image and click on its position within the canvas.
 */
async function findAndClick(page, templateImagePath) {
  const canvas = await page.locator('canvas');
  const box = await canvas.boundingBox();
  if (!box) throw new Error('Canvas bounding box not found');

  const { x, y } = await waitForImage(page, templateImagePath);
  await page.mouse.click(box.x + x, box.y + y);
}

module.exports = {
  waitForImage,
  waitForImageToDisappear,
  findAndClick,
};
