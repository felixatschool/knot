# compare_images.py
import sys
import cv2
import json

img1 = cv2.imread(sys.argv[1])
img2 = cv2.imread(sys.argv[2])
res = cv2.matchTemplate(img1, img2, cv2.TM_CCOEFF_NORMED)
_, max_val, _, _ = cv2.minMaxLoc(res)

threshold = 0.95
print(json.dumps({"match": max_val >= threshold, "confidence": max_val}))
