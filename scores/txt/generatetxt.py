o = 'o'
b = 'b'

for x in range(16):
    file = open(o + str(x) + '.txt', 'a')
    file.write(str(x))
    file.close


for x in range(16):
    file = open(b + str(x) + '.txt', 'a')
    file.write(str(x))
    file.close