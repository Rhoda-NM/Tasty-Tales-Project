#!/usr/bin/env python3


# Remote library imports
from flask import Flask, request, make_response, jsonify, session
from flask_restful import Resource, Api  #  imported Api
from flask_migrate import Migrate  #  imported Migrate
from werkzeug.security import check_password_hash

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
        
       data=request.get_json()
       username=data['username']
       password=data['password']
       
       user=User.query.filter_by(username=username).first()
       
       if user and user.check_password(password):
           session['user_id'] = user.id
           return user.to_dict(),200
       
       return {'error':'invalid username or password'},401
   
class Logout(Resource):
       def delete(self):
           session['user_id'] = None
           return {},204

class CheckSession(Resource):
     def get(self):
        user = User.query.filter_by(id=session.get('user_id')).first()
        if user:
            return user.to_dict(), 200
        return {'error': 'User not logged in'}, 401


api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(CheckSession, '/check_session')


if __name__ == '__main__':
    app.run(port=5555, debug=True)

