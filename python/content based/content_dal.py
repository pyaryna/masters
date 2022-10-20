import datetime

database = None

def connect_to_database(db):
    global database
    database = db

def get_collection(dataset):
    cursor = database[dataset].find({})
    return list(cursor)

def get_rates_by_user(user):
    cursor = database.rates.aggregate([
        {
            "$unwind": "$reviews"
        },
        {
            '$match' : {'reviews.user._id' : user}
        },
        {
            '$project': {
                'bookId': '$bookId',
                'rate': '$reviews.rate'
                }
        }
    ])
    return list(cursor)    

def get_books():
    cursor = database.books.aggregate([
        {
            '$project': {
                'title': '$title',
                'description': '$description',
                'genres': '$genres.name',
                'author': '$author.name'
                }
        }
    ])
    return list(cursor)

def get_books_by_ids(bookIds):
    cursor = database.books.aggregate([
        {
            '$match' : {'_id' : { '$in' : bookIds }}
        },
        {
            '$project': {
                'id': '$_id',
                'title': '$title',
                'price': '$price',
                'imageUrl': '$imageUrl',
                'author': '$author.name'
                }
        }
    ])
    return list(cursor)

def get_books_by_id(bookId):
    cursor = database.books.aggregate([
        {
            '$match' : {'_id' : bookId }
        },
        {
            '$project': {
                'title': '$title',
                'description': '$description',
                'genres': '$genres.name',
                'author': '$author.name'
                }
        }
    ])
    
    return list(cursor)[0]

def get_books_not_in_ids(bookIds):
    cursor = database.books.aggregate([
        {
            '$match' : {'_id' : { '$nin' : bookIds }}
        },
        {
            '$project': {
                'title': '$title',
                'description': '$description',
                'genres': '$genres.name',
                'author': '$author.name'
                }
        }
    ])
    return list(cursor)