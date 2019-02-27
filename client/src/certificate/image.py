# # coding=utf-8

# from __future__ import unicode_literals
# from PIL import Image, ImageFont, ImageDraw

# img = Image.open("certificate.png")
# draw = ImageDraw.Draw(img)
# text = u"اسم المسمى"
# unicode_font = ImageFont.truetype("font.ttf", 16)

# draw.text((500,280), text, (0,0,0), font=unicode_font)
# draw = ImageDraw.Draw(img)
# img.save("a_test.png")

import arabic_reshaper

from bidi.algorithm import get_display

from PIL import ImageFont
from PIL import Image
from PIL import ImageDraw

# Write some Text

fontFile = 'font.ttf'
imageFile = 'certificate.png'

font = ImageFont.truetype(fontFile, 18)
image = Image.open(imageFile)

text = "السلام عليكم"
reshaped_text = arabic_reshaper.reshape(text)    # correct its shape
bidi_text = get_display(reshaped_text)           # correct its direction

draw = ImageDraw.Draw(image)
draw.text((500, 280), bidi_text, (0,0,0), font=font)
draw = ImageDraw.Draw(image)

image.save("output.png")

