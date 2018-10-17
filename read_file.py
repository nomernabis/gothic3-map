import json

json_data = []
file_name = input()
with open(f'{file_name}.txt') as f:
    for line in f:
        lat, lng = line.split(' ')
        lng = lng[:-1]
        pair = {'lat': lat, 'lng': lng}
        json_data.append(pair)


with open(f'{file_name}.json', 'w+') as f:
    f.write(json.dumps(json_data))

