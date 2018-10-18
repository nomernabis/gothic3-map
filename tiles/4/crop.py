from PIL import Image
import os

dir_name = 'dir'


def crop(num):
    im = Image.open(num + '.jpg')
    imwidth, imheight = im.size

    tile_width = imwidth // 2
    tile_height = imheight // 2

    for i in range(0, 2):
        for j in range(0, 2):
            x = j * tile_width
            y = i * tile_height

            box = (x, y, x+tile_width, y+tile_height)
            a = im.crop(box)
            a.save(f'{dir_name}/{num+i*2+j}.jpg')

def file_names(file):
    im = Image.open(file)
    imwidth, imheight = im.size
    tile_width = imwidth // 2
    tile_height = imheight // 2
    name = file.split('.')[0]
    i_old, j_old = name.split('_')

    for i in range(0, 2):
        for j in range(0, 2):
            print(f'{i_old} {j_old} {int(i_old)*2 + i} {int(j_old)*2 + j}')
            i_new = int(i_old)*2 + i
            j_new = int(j_old)*2 + j
            x = j*tile_width
            y = i*tile_height
            box = (x, y, x+tile_width, y+tile_height)
            a = im.crop(box)
            a.save(f'{dir_name}/{i_new}_{j_new}.jpg')


files = os.listdir(os.getcwd())
for file in files:
    if not os.path.isdir(file):
        ext = file.split('.')[1]
        if ext == 'jpg':
            file_names(file)
