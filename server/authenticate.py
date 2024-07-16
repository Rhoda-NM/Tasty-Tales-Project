from flask import  request, make_response, jsonify, session, Blueprint
from flask_restful import Resource, Api,Reviews
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

# Local imports
from config import db, app
# Add your model imports
from models import User

authenticate_bp = Blueprint('authenticate_bp',__name__)
#authenticate_api = Api(authenticate_bp)
#db.init_app(app)
#bcrypt.init_app(app)
jwt = JWTManager(app)
def init_jwt(app):
    jwt.init_app(app) 

@jwt.user_identity_loader
def user_identity_lookup(user_id):
    return user_id

@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return User.query.filter_by(id=identity).one_or_none()


@authenticate_bp.route('/signup', methods=["POST"])
def signup():
        #data = request.get_json()
        username = request.get_json()['userName']
        email = request.get_json()['email']
        password = request.get_json()['password']

        if username and email and password:
            if User.query.filter_by(username=username).first() or User.query.filter_by(email=email).first():
                return {'error': 'User already exists'}, 400
            
            new_user = User(username=username, email=email)
            new_user.set_password(password)
            db.session.add(new_user)
            db.session.commit()

            session['user_id'] = new_user.id
            access_token = create_access_token(identity=new_user.id)

            return {'user': new_user.to_dict(), 'access_token': access_token}, 201
    

        return {'error': '422 Unprocessable Entity'}, 422

@authenticate_bp.route('/login', methods=["POST"])
def login():
    data=request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    user=User.query.filter_by(email=email).first()
    
    if user and user.check_password(password):
        session['user_id'] = user.id
        access_token = create_access_token(identity=user.id)

        return {'user': user.to_dict(), 'access_token': access_token}, 200
    return {'error':'invalid username or password'},401
   
class Logout(Resource):
       def delete(self):
           session['user_id'] = None
           return {},204
class ReviewResource(Resource):
    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        data = request.get_json()
        new_review = Reviews(content=data['comment'], recipe_id=data['recipe_id'], user_id=user_id)
        db.session.add(new_review)
        db.session.commit()
        return new_review.to_dict(), 201
class CheckSession(Resource):
     @jwt_required()
     def get(self):
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        #user = User.query.filter_by(id=session.get('user_id')).first()
        if user:
            return user.to_dict(), 200
        return {'error': 'User not logged in'}, 401

#authenticate_api.add_resource(Signup, '/sign', endpoint='signup')
#authenticate_api.add_resource(Login, '/login')

#authenticate_api.add_resource(Logout, '/logout')
#authenticate_api.add_resource(CheckSession, '/check_session')


