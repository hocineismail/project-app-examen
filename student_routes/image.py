import arabic_reshaper

from bidi.algorithm import get_display

from PIL import ImageFont
from PIL import Image
from PIL import ImageDraw
import sys
import os
from io import BytesIO

os.chdir(os.path.dirname(__file__))

def open_filename(filename):
    font = ImageFont.truetype(filename)
    return font

def open_data(filename):
    with open(filename, "rb") as f:
        font_bytes = BytesIO(f.read())
    font = ImageFont.truetype(font_bytes, 18)
    return font

def createCertificate(exam, name, date):
    fontFile = '/font.ttf'
    imageFile = 'certificate.png'
    
    font = ImageFont.truetype(os.getcwd() + fontFile, 18)
    image = Image.open(imageFile)

    exam = exam
    reshaped_exam = arabic_reshaper.reshape(exam)    # correct its shape
    bidi_exam = get_display(reshaped_exam)     

    name = name
    reshaped_name = arabic_reshaper.reshape(name)    # correct its shape
    bidi_name = get_display(reshaped_name)           # correct its direction

    date = date
    reshaped_date = arabic_reshaper.reshape(date)    # correct its shape
    bidi_date = get_display(reshaped_date)           # correct its direction

    draw = ImageDraw.Draw(image)
    draw.text((490, 280), bidi_exam, (0,0,0), font=font)
    draw.text((350, 345), bidi_name, (0,0,0), font=font)
    draw.text((150, 440), bidi_date, (0,0,0), font=font)
    draw = ImageDraw.Draw(image)

    image.save("output.png")
    print(True)
    sys.stdout.flush()

createCertificate(sys.argv[1], sys.argv[2], sys.argv[3])
