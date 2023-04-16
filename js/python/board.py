import os

try:
    import firebase_admin
    from firebase_admin import credentials
    from firebase_admin import firestore
    from datetime import datetime
    import pytz

except:
    os.system("python -m pip install firebase_admin")
    os.system("python -m pip install datatime")
    os.system("python -m pip install pytz")
    import firebase_admin
    from firebase_admin import credentials
    from firebase_admin import firestore
    import pytz

VN = pytz.country_timezones('VN')
tz_VN = pytz.timezone(VN[0])
now = datetime.now(tz_VN)

# Use a service account.
cred = credentials.Certificate('twitter-3d8a7-firebase-adminsdk-4z59m-da8d2245ed.json')

app = firebase_admin.initialize_app(cred)

db = firestore.client()

docs = db.collection(u'gameData').stream()

board = {

}

for doc in docs:
	data = doc.to_dict()
	if(data["by"] not in board):
		board.update({data["by"]:data["score"]})
	else:
		board[data["by"]] = data["score"] + board.get(data["by"])

	print(f'{doc.id} => {doc.to_dict()}')


print(board)

first_score = 0
second_score = 0
third_score = 0

score_list = []

for i in board.values():
	score_list.append(i)


docs = db.collection(u'leaders').stream()

for doc in docs:
	db.collection(u'leaders').document(doc.id).delete()

	print(f'{doc.id} => {doc.to_dict()}')


score_list.sort()
score_list.reverse()

leaderBoard = {}

for i in range(len(score_list)):
	for j,x in board.items():
		print(j,x)
		if(x == score_list[i]):
			leaderBoard.update({j:x})
		print(i);

print(score_list)
print(leaderBoard)

index = 0

for x,y in leaderBoard.items():
	print(x)
	print(y)
	doc_ref = db.collection(u'leaders').document(str(index))

	doc_ref.set({
		u"by":x,
		u"score":y
	})
	index += 1

time_ref = db.collection(u'info').document(u'time')

current_time = now.strftime("%H:%M:%S")
print("Current Time =", current_time)

time_ref.set({
	u"current": current_time
}, merge=True)
