#!/usr/bin/env python3


# Remote library imports
from flask import Flask, request, make_response, jsonify, session
from flask_restful import Resource, Api  #  imported Api
from flask_migrate import Migrate  #  imported Migrate

# Local imports
from config import app, db 
# Add your model imports
from models import User, Recipes, Rating, RecipeTag, Reviews, Tags

app = Flask(__name__)
app.secret_key = b'Y\xf1Xz\x00\xad|eQ\x80t \xca\x1a\x10K'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

# Initialize database and migration
db.init_app(app)
migrate = Migrate(app, db)

# Initialize API
api = Api(app)
# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'
class Login(Resource):

    def post(self):
        
        username = request.get_json()['username']
        user = User.query.filter(User.username == username).first()

        session['user_id'] = user.id

        return user.to_dict(), 200



if __name__ == '__main__':
    app.run(port=5555, debug=True)

