import requests

def postNewCup(cupType, boxId):
    requests.post(f"http://127.0.0.1:3000/type/{cupType}/boxId/{boxId}")

def postNewBox(size):
    request = requests.post(f"http://127.0.0.1:3000/size/{size}")
    return request.json.id