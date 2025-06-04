# Knot  🪢

**Knot** is a framework that *ties the gap* between Playwright and canvas-based testing.

Traditional Playwright selectors don’t work on canvas elements, since its content is rendered pixel-by-pixel.<br>
Knot overcomes this limitation by combining Playwright's browser automation with OpenCV for image-based recognition. This allows automated tests to detect and interact with visual elements drawn on the canvas using reference image templates.

The project includes a sample test implementation demonstrating how to use Knot to validate canvas content and simulate real user interactions.


## Getting Started

### 1. Setup Python environment
```bash
python3 -m venv venv
source venv/bin/activate
pip install opencv-python
```

### 2. Install Playwright dependencies
```bash
cd playwright
npm install
npx playwright install
```

### 3. Running the demo
```bash
npx playwright test
```
