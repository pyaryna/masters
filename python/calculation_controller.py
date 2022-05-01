import flask
from calculation_bll import *
from flask import request, jsonify

# calculate_similarity()
# calculate_recomendations_for_user()
# calculate_recomendations_by_book()

app = flask.Flask(__name__)
app.config["DEBUG"] = True



# connect_to_database(database)

@app.route('/', methods=['GET'])
def home():
    return '''<h1>Distant Reading Archive</h1>
<p>A prototype API for distant reading of science fiction novels.</p>'''


@app.route('/api/v1/calculate_similarity', methods=['GET'])
def calculate_similarity():
    return jsonify(calculate_similarity())


@app.route('/api/v1/user', methods=['GET'])
def recommendation_for_user():
    return jsonify(calculate_recomendations_for_user(database))


@app.route('/api/v1/book', methods=['GET'])
def recommendation_by_book():
    return jsonify(calculate_recomendations_for_user())

app.run()