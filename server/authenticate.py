from flask import request, make_response, jsonify, session, Blueprint
from flask_restful import Resource, reqparse
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from models import User, Review, Rating, db  # Import Review here

# Local imports
from config import db, app

authenticate_bp = Blueprint('authenticate_bp', __name__)

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
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    user = User.query.filter_by(email=email).first()
    if user and user.check_password(password):
        session['user_id'] = user.id
        access_token = create_access_token(identity=user.id)

        return {'user': user.to_dict(), 'access_token': access_token}, 200
    return {'error': 'invalid username or password'}, 401

class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return {}, 204

class ReviewResource(Resource):
    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        data = request.get_json()
        new_review = Review(content=data['comment'], recipe_id=data['recipe_id'], user_id=user_id)  # Use Review here
        db.session.add(new_review)
        db.session.commit()
        return new_review.to_dict(), 201

    @jwt_required()
    def get(self, review_id):
        review = Review.query.get(review_id)  # Use Review here
        if review:
            return review.to_dict(), 200
        return {'error': 'Review not found'}, 404

    @jwt_required()
    def put(self, review_id):
        review = Review.query.get(review_id)  # Use Review here
        if not review:
            return {"msg": "Review not found"}, 404
        data = request.get_json()
        review.content = data['comment']
        db.session.commit()
        return review.to_dict(), 200

    @jwt_required()
    def delete(self, review_id):
        review = Review.query.get(review_id)  # Use Review here
        if not review:
            return {"msg": "Review not found"}, 404
        db.session.delete(review)
        db.session.commit()
        return {}, 204

class RatingResource(Resource):
    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        data = request.get_json()
        new_rating = Rating(score=data['rating'], recipe_id=data['recipe_id'], user_id=user_id)  # Added user_id here
        db.session.add(new_rating)
        db.session.commit()
        return new_rating.to_dict(), 201

    @jwt_required()
    def get(self, rating_id):
        rating = Rating.query.get(rating_id)
        if rating:
            return rating.to_dict(), 200
        return {"msg": "Rating not found"}, 404

    @jwt_required()
    def put(self, rating_id):
        rating = Rating.query.get(rating_id)
        if not rating:
            return {"msg": "Rating not found"}, 404
        data = request.get_json()
        rating.score = data['rating']
        db.session.commit()
        return rating.to_dict(), 200

    @jwt_required()
    def delete(self, rating_id):
        rating = Rating.query.get(rating_id)
        if not rating:
            return {"msg": "Rating not found"}, 404
        db.session.delete(rating)
        db.session.commit()
        return {}, 204

class CheckSession(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        if user:
            return user.to_dict(), 200
        return {'error': 'User not logged in'}, 401

#authenticate_api.add_resource(Signup, '/sign', endpoint='signup')
#authenticate_api.add_resource(Login, '/login')
#authenticate_api.add_resource(ReviewResource, '/reviews', '/reviews/<int:review_id>')
#authenticate_api.add_resource(Logout, '/logout')
#authenticate_api.add_resource(CheckSession, '/check_session')
#authenticate_api.add_resource(RatingResource, '/ratings', '/ratings/<int:rating_id>')
