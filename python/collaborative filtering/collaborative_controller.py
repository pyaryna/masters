from flask import Flask, jsonify
from pymongo import MongoClient
from flask_cors import CORS
from bson.objectid import ObjectId
from flask_restx import Api, Resource

from config import *
from collaborative_bll import *

app = Flask(__name__)
api = Api(app)

client = MongoClient(connectionString)
db = client['masters']
CORS(app)

connect_to_database(db)

@api.route('/')
class Home(Resource):
    def get(self):
        return '''<h1>Recommendation system of books</h1>
            <p>Item-based Collaborative filtration</p>'''


@api.route('/similarity')
class BookSimilarity(Resource):
    def get(self):
        amount = calculate_similarity()
        return jsonify({
                'status': '200 OK',
                'message':'Data is posted to MongoDB!',
                'amount': amount
            })

@api.route('/book/<string:id>/<int:number>')
class RecommendationByBook(Resource):
    def get(self, id, number):
        book_id = ObjectId(id) # 630602ac073e94de49556751
        return calculate_recomendations_by_book(book_id, number)

@api.route('/user/<string:id>/<int:number>')
class RecommendationForUser(Resource):
    def get(self, id, number):
        user_id = ObjectId(id) # 620bb9fef23b1bc78052c5db
        return calculate_recomendations_for_user(user_id, number)

if __name__ == '__main__':
    app.run(port=5000, debug = True)