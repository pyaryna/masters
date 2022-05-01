import asyncio
import datetime
import nest_asyncio
import motor.motor_asyncio

from config import *

database = None

# def connect_to_database(db):
#     global database
#     database = db

def get_collection(dataset):
    async def do_find(dataset):
        result = []
        cursor = database[dataset].find({})
        for document in await cursor.to_list(length=1400):
            result.append(document)
        return result

    try:
        loop = asyncio.get_event_loop()
        return loop.run_until_complete(do_find(dataset))
    except Exception:
        raise Exception('Connection to database failed')

def get_rates_for_previous_day():
    async def do_find():
        result = []
        yesterday_datetime = datetime.datetime.utcnow() - datetime.timedelta(days = 1)
        yesterday = datetime.datetime(yesterday_datetime.year, yesterday_datetime.month, yesterday_datetime.day)
        cursor = database.rates.find({'reviews.createdAt':{ '$eq': yesterday}})
        for document in await cursor.to_list(length=1400):
            result.append(document)
        return result

    try:
        loop = asyncio.get_event_loop()
        return loop.run_until_complete(do_find())
    except Exception:
        raise Exception('Connection to database failed')

def get_random_record(collection):
    async def do_find():        
        async for document in database[collection].aggregate([{ '$sample': { 'size': 1 } }]):
            return document

    try:
        loop = asyncio.get_event_loop()
        return loop.run_until_complete(do_find())
    except Exception:
        raise Exception('Connection to database failed')

def get_rates_by_users(users):
    # nest_asyncio.apply()
    client = motor.motor_asyncio.AsyncIOMotorClient(connectionString)

    database = client['masters']
    async def do_find():
        result = []
        cursor = database.rates.find({
            'reviews.userId' : { '$in' : users}
        })
        for document in await cursor.to_list(length=1400):
            result.append(document)
        return result

    try:
        asyncio.set_event_loop(asyncio.SelectorEventLoop())
        loop = asyncio.get_event_loop()
        return loop.run_until_complete(do_find())
    except Exception:
        raise Exception('Connection to database failed')

def get_similarity_by_book(bookId):
    async def do_find():
        result = []
        cursor = database.similarity.find({
            '$or': [
                {'book1' : bookId},
                {'book2' : bookId}
            ]})
        for document in await cursor.to_list(length=1400):
            result.append(document)
        return result

    try:
        loop = asyncio.get_event_loop()
        return loop.run_until_complete(do_find())
    except Exception:
        raise Exception('Connection to database failed')

def delete_similarity_by_books(bookIds):
    async def do_delete_many():
        await database.similarity.delete_many({
            '$or': [
                {'book1' : { '$in' : bookIds}},
                {'book2' : { '$in' : bookIds}}
            ]})
    
    try:
        loop = asyncio.get_event_loop()
        loop.run_until_complete(do_delete_many())
    except Exception:
        raise Exception('Connection to database failed')

def insert_books_similarity(similarity):
    async def do_insert_data(data):
        await database.similarity.insert_many(
            [ i for i in data])       

    try:
        loop = asyncio.get_event_loop()
        loop.run_until_complete(do_insert_data(similarity))
    except Exception:
        raise Exception('Connection to database failed')

def insert_recomendations(recomendations):
    async def do_insert_data(data):
        await database.recomendations.insert_many(
            [ i for i in data])       

    try:
        loop = asyncio.get_event_loop()
        loop.run_until_complete(do_insert_data(recomendations))
    except Exception:
        raise Exception('Connection to database failed')