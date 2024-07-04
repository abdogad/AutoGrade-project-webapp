import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("emam-llms-firebase-adminsdk-5mx99-021cf33358.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

url = db.collection('ngrok').document('tunnel').get().to_dict()['url_1']
print(url)