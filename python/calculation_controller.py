from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId
from flask_cors import CORS

from config import *
from calculation_bll import *

app = Flask(__name__)
client = MongoClient(connectionString)
# db = client.lin_flask
db = client['masters']
CORS(app)

connect_to_database(db)

@app.route('/', methods=['GET'])
def home():
    return '''<h1>Distant Reading Archive</h1>
<p>A prototype API for distant reading of science fiction novels.</p>'''


@app.route('/api/v1/similarity', methods=['GET'])
def calculate_book_similarity():
    amount = calculate_similarity()
    return jsonify({
            'status': '200 OK',
            'message':'Data is posted to MongoDB!',
            'amount': amount
        })


@app.route('/api/v1/user', methods=['GET'])
def recommendation_for_user():
    recommedations = []
    for item in calculate_recomendations_for_user():
        recommedations.append({
            'rate': item[0],
            'bookId': str(item[1])
        })
    return jsonify(recommedations)


@app.route('/api/v1/book', methods=['GET'])
def recommendation_by_book():
    recommedations = []
    for item in calculate_recomendations_by_book():
        recommedations.append({
            'rate': item[0],
            'bookId': str(item[1])
        })
    return jsonify(recommedations)

if __name__ == '__main__':
    app.debug = True
    app.run()