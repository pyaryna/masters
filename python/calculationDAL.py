import asyncio
import datetime
import nest_asyncio
import motor.motor_asyncio

from config import *

nest_asyncio.apply()

client = motor.motor_asyncio.AsyncIOMotorClient(connectionString)
db = client.test

try:
    print(client.server_info())
except Exception:
    print("Unable to connect to the server.")

db = client['masters']

def getCollection(dataset):
    async def do_find(dataset):
        result = []
        cursor = db[dataset].find({})
        for document in await cursor.to_list(length=1400):
            result.append(document)
        return result

    try:
        loop = asyncio.get_event_loop()
        return loop.run_until_complete(do_find(dataset))
    except Exception:
        raise Exception("Connection to database failed")

def GetRatesForPreviousDay():
    async def do_find():
        result = []
        yesterday = datetime.datetime.utcnow() - datetime.timedelta(days = 1)
        cursor = db.rates.find({
            "createdAt": { "$regex": "^{}".format(yesterday.strftime('%d.%m.%Y'))}
        })
        for document in await cursor.to_list(length=1400):
            result.append(document)
        return result

    try:
        loop = asyncio.get_event_loop()
        return loop.run_until_complete(do_find())
    except Exception:
        raise Exception("Connection to database failed")

def GetRatesForSelectedBooksAndUsers(books, users):
    async def do_find():
        result = []
        cursor = db.rates.find({
            "$or" : [{
                        "bookId" : { "$in" : books}
                    },
                    {
                        "userId" : { "$in" : users}
                    }]
        })
        for document in await cursor.to_list(length=1400):
            result.append(document)
        return result

    try:
        loop = asyncio.get_event_loop()
        return loop.run_until_complete(do_find())
    except Exception:
        raise Exception("Connection to database failed")

def GetRatesForSelectedBooks(books):
    async def do_find():
        result = []
        cursor = db.rates.find({
            "bookId" : { "$in" : books}
        })
        for document in await cursor.to_list(length=1400):
            result.append(document)
        return result

    try:
        loop = asyncio.get_event_loop()
        return loop.run_until_complete(do_find())
    except Exception:
        raise Exception("Connection to database failed")

def DeleteRatesByBooks():
    async def do_delete_many():
        await db.rates.delete_many({'i': {'$ne': ''}})
    
    try:
        loop = asyncio.get_event_loop()
        loop.run_until_complete(do_delete_many())
    except Exception:
        raise Exception("Connection to database failed")

def InsertBooksSimilarity(similarity):
    async def do_insert_data(data):
        await db.similarity.insert_many(
            [ i for i in data])       

    try:
        loop = asyncio.get_event_loop()
        loop.run_until_complete(do_insert_data(similarity))
    except Exception:
        raise Exception("Connection to database failed")

def InsertRecomendations(recomendations):
    async def do_insert_data(data):
        await db.recomendations.insert_many(
            [ i for i in data])       

    try:
        loop = asyncio.get_event_loop()
        loop.run_until_complete(do_insert_data(recomendations))
    except Exception:
        raise Exception("Connection to database failed")