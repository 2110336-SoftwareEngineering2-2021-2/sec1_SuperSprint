import pymongo

client = pymongo.MongoClient("mongodb://botercup:6231358221@tuture.krcke.mongodb.net/test?retryWrites=true&w=majority")
db = client.test
collection = db.test

print(collection.find_one())

print('eiei')