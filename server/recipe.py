from flask import request, jsonify, Blueprint
from  flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity

# Local imports
from config import db, api
from models import Recipe, User

recipe_bp = Blueprint('recipe_bp', __name__)

@recipe_bp.route('/recipes')
def test():
    response = [recipe.to_dict() for recipe in Recipe.query.all()]
    return jsonify(response), 200

"""@jwt_required()
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

api.add_resource(RecipeResource, '/recipe', '/recipe/<int:id>')"""
