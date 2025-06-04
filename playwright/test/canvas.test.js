import { test, expect } from '@playwright/test';
import path from 'path';
import { pathToFileURL } from 'url';
import { findAndClick, waitForImage, waitForImageToDisappear } from './fixture/knot.js';

const htmlPath = path.resolve(__dirname, '../../assets/index.html');
const fileUrl = pathToFileURL(htmlPath).href;

// Define image to search and interact
const icon = 'assets/images/butterfly.png';
const menu = 'assets/images/menu.png';
const button = 'assets/images/close-btn.png';

test('Canvas based test', async ({ page }) => {
  // Step 1: Go to canvas based application
  await page.goto(fileUrl);

  // Step 2: Click icon
  await findAndClick(page, icon);

  // Step 3: Wait for menu to appoar
  await waitForImage(page, menu);

  // Step 4: Click close button
  await findAndClick(page, button);

  // Step 5: Wait for menu to disappoar
  await waitForImageToDisappear(page, menu);
});
