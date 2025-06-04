# find_template.py
import sys
import cv2
import json

screenshot_path = sys.argv[1]
template_path = sys.argv[2]

image = cv2.imread(screenshot_path)
template = cv2.imread(template_path)
result = cv2.matchTemplate(image, template, cv2.TM_CCOEFF_NORMED)
_, max_val, _, max_loc = cv2.minMaxLoc(result)

threshold = 0.8
if max_val < threshold:
    print(json.dumps({"found": False}))
    sys.exit(0)

h, w = template.shape[:2]
center_x = max_loc[0] + w // 2
center_y = max_loc[1] + h // 2

print(json.dumps({"found": True, "x": center_x, "y": center_y}))
