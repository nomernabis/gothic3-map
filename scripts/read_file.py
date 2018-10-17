import json

json_data = []
with open('coords.txt') as f:
    for line in f:
        lat, lng = line.split(' ')
        lng = lng[:-1]
        pair = {'lat': lat, 'lng': lng}
        json_data.append(pair)


with open('coords.json', 'w+') as f:
    f.write(json.dumps(json_data))

