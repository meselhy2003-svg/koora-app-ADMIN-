import base64
import os
from PIL import Image

src_path = 'tag logo/logo-removebg-preview-removebg-preview.png'
logo = Image.open(src_path).convert('RGBA')

# 1. Trim surrounding transparent padding
bbox = logo.getbbox()
if bbox:
    cropped = logo.crop(bbox)
else:
    cropped = logo

w, h = cropped.size

# 2. Scale logo to target_w = 60px inside 64x64 canvas for a larger, prominent tag logo
canvas_size = 64
target_w = 60
aspect = h / w
target_h = int(target_w * aspect)

logo_resized = cropped.resize((target_w, target_h), Image.Resampling.LANCZOS)

# Create transparent square canvas
fav = Image.new('RGBA', (canvas_size, canvas_size), (0, 0, 0, 0))
offset_x = (canvas_size - target_w) // 2
offset_y = (canvas_size - target_h) // 2
fav.paste(logo_resized, (offset_x, offset_y), logo_resized)

# Save favicon.png and multi-resolution favicon.ico
fav.save('public/favicon.png', 'PNG')
fav.save('public/favicon.ico', format='ICO', sizes=[(16,16), (32,32), (48,48), (64,64)])

# Generate SVG format favicon
with open('public/favicon.png', 'rb') as f:
    b64 = base64.b64encode(f.read()).decode('utf-8')

svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <image href="data:image/png;base64,{b64}" x="0" y="0" width="64" height="64" />
</svg>'''

with open('public/favicon.svg', 'w', encoding='utf-8') as f:
    f.write(svg_content)

# Update dist directory if build exists
if os.path.exists('dist'):
    fav.save('dist/favicon.png', 'PNG')
    fav.save('dist/favicon.ico', format='ICO', sizes=[(16,16), (32,32), (48,48), (64,64)])
    with open('dist/favicon.svg', 'w', encoding='utf-8') as f:
        f.write(svg_content)

print("Favicon tag logo scaled up to 60px width!")
