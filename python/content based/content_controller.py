from flask import Flask, jsonify
from pymongo import MongoClient
from flask_cors import CORS
from bson.objectid import ObjectId
from flask_restx import Api, Resource

from config import *
from content_bll import *

app = Flask(__name__)
api = Api(app)

client = MongoClient(connectionString)
db = client['masters']
CORS(app)

connect_to_database(db)

@api.route('/')
class Home(Resource):
    def get(self):
        return '''<h1>Content-based recommendation system of books</h1>'''


@api.route('/book/<string:id>/<int:number>/<string:user>')
@api.route('/book/<string:id>/<int:number>')
class RecommendationByBook(Resource):
    def get(self, id, number, user = None):
        book_id = ObjectId(id) # 630602ac073e94de49556749
        user_id = ObjectId(user) if user != None else None # 620bb9fef23b1bc78052c5e6
        return calculate_recomendations_by_book(book_id, number, user_id)


@api.route('/user/<string:id>/<int:number>')
class RecommendationForUser(Resource):
    def get(self, id, number):
        user_id = ObjectId(id) # 620bb9fef23b1bc78052c5e6
        return calculate_recomendations_for_user(user_id, number)


if __name__ == '__main__':
    app.run(port=5001, debug = True)