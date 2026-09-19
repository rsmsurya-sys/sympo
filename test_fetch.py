import urllib.request
import urllib.parse
import json

url = "https://script.google.com/macros/s/AKfycbxX9KcfQxBcTtJW1Js-akpRgvjwJvwHoP4hJLBeJMyc6GqJcORmOQOUNVutGrwSlN-D/exec"

data = {
    "timestamp": "19/09/2026, 19:00:00",
    "passId": "#INT2K26-TEST-777",
    "name": "TEST SANJAY",
    "email": "test@gmail.com",
    "mobile": "9876543210",
    "regNo": "7339371752",
    "gender": "Male",
    "college": "Mahendra College",
    "dept": "AI&DS",
    "district": "Salem",
    "pincode": "636106",
    "selectedEvents": "Innov Expo, Prompt-a-thon",
    "referred": "No",
    "referralSource": "Direct",
    "referralDept": "",
    "utrNo": "999999999999",
    "paymentProof": "Uploaded"
}

output = []
output.append("=== TESTING GOOGLE APPS SCRIPT WEB APP URL ===")

# Test 1: GET Request
try:
    params = urllib.parse.urlencode(data)
    get_url = f"{url}?{params}"
    req = urllib.request.Request(get_url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as resp:
        body = resp.read().decode('utf-8')
        output.append(f"GET Response Status: {resp.status}")
        output.append(f"GET Response Body: {body}")
except Exception as e:
    output.append(f"GET Error: {e}")

# Test 2: POST JSON Request
try:
    json_bytes = json.dumps(data).encode('utf-8')
    req = urllib.request.Request(url, data=json_bytes, headers={'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0'}, method='POST')
    with urllib.request.urlopen(req) as resp:
        body = resp.read().decode('utf-8')
        output.append(f"POST Response Status: {resp.status}")
        output.append(f"POST Response Body: {body}")
except Exception as e:
    output.append(f"POST Error: {e}")

with open("test_results.txt", "w") as f:
    f.write("\n".join(output))

print("Done testing!")
