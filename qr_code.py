import qrcode
data = input("enter the text")
img = qrcode.make(data)
img.save("qrcode.png")
print("QR code saved as qrcode.png")