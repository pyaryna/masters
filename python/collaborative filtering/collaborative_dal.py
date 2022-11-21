import datetime

database = None

def connect_to_database(db):
    global database
    database = db

def get_collection(dataset):
    cursor = database[dataset].find({})
    return list(cursor)

def get_rates_for_previous_day():    
    # yesterday_datetime = datetime.datetime.utcnow() - datetime.timedelta(days = 1)
    # yesterday = datetime.datetime(yesterday_datetime.year, yesterday_datetime.month, yesterday_datetime.day)
    # cursor = database.rates.find({'reviews.createdAt':{ '$eq': yesterday}})
    cursor = database.rates.find({})
    return list(cursor)

def get_random_record(collection):
    for document in database[collection].aggregate([{ '$sample': { 'size': 1 } }]):
        return document

def get_rates_by_users(users):
    cursor = database.rates.find({
        'reviews.user._id' : { '$in' : users}
    })
    return list(cursor)    

def get_books_by_ids(bookIds):
    cursor = database.books.aggregate([
        {
            '$match' : {'_id' : { '$in' : bookIds }}
        },
        {
            '$project': {
                'id': '$_id',
                'title': 1,
                'price': 1,
                'imageUrl': 1,
                'author': 1,
                'genres': 1,
                'publisher': 1
                }
        }
    ])
    return list(cursor)

def get_similarity_by_book(bookId):
    cursor = database.similarity.find({
        '$or': [
            {'book1Id' : bookId},
            {'book2Id' : bookId}
        ]})
    return list(cursor)

def delete_similarity_by_books(bookIds):
    database.similarity.delete_many({
        '$or': [
            {'book1Id' : { '$in' : bookIds}},
            {'book2Id' : { '$in' : bookIds}}
        ]})

def insert_books_similarity(similarity):
    database.similarity.insert_many(
        [ i for i in similarity])       

def insert_recomendations(recomendations):
    database.recomendations.insert_many(
        [ i for i in recomendations])       
