#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, request, jsonify
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Recipe, Rating, RecipeTag, Review, Tag

# Views go here!
class Index(Resource):
    def get(self):
        return "Welcome to TASTY TALES"

api.add_resource(Index, '/')

class UserResource(Resource):
    def get(self, id=None):
        if id is None:
            users = [user.to_dict() for user in User.query.all()]
            return jsonify(users), 200
        else:
            user = User.query.get_or_404(id)
            return jsonify(user.to_dict()), 200

    def post(self):
        data = request.get_json()
        if not data:
            return {"message": "No input data provided"}, 400
        
        new_user = User(
            username=data['username'],
            email=data['email'],
            password_hash=data['password_hash']
        )
        db.session.add(new_user)
        db.session.commit()
        return jsonify(new_user.to_dict()), 201

    def put(self, id=None):
        user = User.query.get_or_404(id)
        data = request.get_json()
        if not data:
            return {"message": "No input data provided"}, 400

        user.username = data.get('username', user.username)
        user.email = data.get('email', user.email)
        user.password_hash = data.get('password_hash', user.password_hash)

        db.session.commit()
        return jsonify(user.to_dict()), 200

    def delete(self, id=None):
        user = User.query.get_or_404(id)
        db.session.delete(user)
        db.session.commit()
        return {"message": "User deleted"}, 204
    
api.add_resource(UserResource, '/user', '/user/<int:id>')

class RecipeResource(Resource):
    def get(self, id=None):
        if id is None:
            response = [recipe.to_dict() for recipe in Recipe.query.all()]
            return jsonify(response), 200
        else:
            response = Recipe.query.get_or_404(id)
            return jsonify(response.to_dict()), 200
    
    def post(self):
        data = request.get_json()
        if not data:
            return {"message": "No input data provided"}, 400
        recipe = Recipe(
            title=data['title'],
            description=data['description'],
            ingredients=data['ingredients'],
            instructions=data['instructions'],
            user_id=data['user_id']
        )
        db.session.add(recipe)
        db.session.commit()
        return jsonify(recipe.to_dict()), 201

    def put(self, id=None):
        recipe = Recipe.query.get_or_404(id)
        data = request.get_json()
        if not data:
            return {"message": "No input data provided"}, 400

        recipe.title = data.get('title', recipe.title)
        recipe.description = data.get('description', recipe.description)
        recipe.ingredients = data.get('ingredients', recipe.ingredients)
        recipe.instructions = data.get('instructions', recipe.instructions)
        recipe.user_id = data.get('user_id', recipe.user_id)

        db.session.commit()
        return jsonify(recipe.to_dict()), 200

    def delete(self, id=None):
        recipe = Recipe.query.get_or_404(id)
        db.session.delete(recipe)
        db.session.commit()
        return {"message": "Recipe deleted"}, 204

api.add_resource(RecipeResource, '/recipe', '/recipe/<int:id>')

class RecipeTagResource(Resource):
    def get(self, id=None):
        if id is None:
            response = [recipe_tag.to_dict() for recipe_tag in RecipeTag.query.all()]
            return jsonify(response), 200
        else:
            response = RecipeTag.query.get_or_404(id)
            return jsonify(response.to_dict()), 200
    
    def post(self):
        data = request.get_json()
        if not data:
            return {"message": "No input data provided"}, 400
        recipe_tag = RecipeTag(
            user_note=data['user_note'],
            recipe_id=data['recipe_id'],
            tag_id=data['tag_id']
        )
        db.session.add(recipe_tag)
        db.session.commit()
        return jsonify(recipe_tag.to_dict()), 201

api.add_resource(RecipeTagResource, '/recipeTag', '/recipeTag/<int:id>')

class ReviewResource(Resource):
    def get(self, id=None):
        if id is None:
            response = [review.to_dict() for review in Review.query.all()]
            return jsonify(response), 200
        else:
            response = Review.query.get_or_404(id)
            return jsonify(response.to_dict()), 200
    
    def post(self):
        data = request.get_json()
        if not data:
            return {"message": "No input data provided"}, 400
        review = Review(
            content=data['content'],
            recipe_id=data['recipe_id'],
            user_id=data['user_id']
        )
        db.session.add(review)
        db.session.commit()
        return jsonify(review.to_dict()), 201

    def delete(self, id=None):
        review = Review.query.get_or_404(id)
        db.session.delete(review)
        db.session.commit()
        return {"message": "Review deleted"}, 204

api.add_resource(ReviewResource, '/review', '/review/<int:id>')

class RatingResource(Resource):
    def get(self, id=None):
        if id is None:
            response = [rating.to_dict() for rating in Rating.query.all()]
            return jsonify(response), 200
        else:
            response = Rating.query.get_or_404(id)
            return jsonify(response.to_dict()), 200
        
    def post(self):
        data = request.get_json()
        if not data:
            return {"message": "No input data provided"}, 400
        rating = Rating(
            score=data['score'],
            recipe_id=data['recipe_id']
        )
        db.session.add(rating)
        db.session.commit()
        return jsonify(rating.to_dict()), 201

    def delete(self, id=None):
        rating = Rating.query.get_or_404(id)
        db.session.delete(rating)
        db.session.commit()
        return {"message": "Rating deleted"}, 204
    
api.add_resource(RatingResource, '/rating', '/rating/<int:id>')

class TagResource(Resource):
    def get(self, id=None):
        if id is None:
            response = [tag.to_dict() for tag in Tag.query.all()]
            return jsonify(response), 200
        else:
            response = Tag.query.get_or_404(id)
            return jsonify(response.to_dict()), 200
    
    def post(self):
        data = request.get_json()
        if not data:
            return {"message": "No input data provided"}, 400
        tag = Tag(
            name=data['name']
        )
        db.session.add(tag)
        db.session.commit()
        return jsonify(tag.to_dict()), 201

api.add_resource(TagResource, '/tag', '/tag/<int:id>')



if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(port=5555, debug=True)

