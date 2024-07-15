from flask import request, jsonify, Blueprint
from  flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
import requests

# Local imports
from config import db, api
from models import Recipe, User, Tag

recipe_bp = Blueprint('recipe_bp', __name__)

def combine_ingredients(data):
    ingredients = []
    for i in range(1, 21):
        ingredient = data.get(f'strIngredient{i}')
        measure = data.get(f'strMeasure{i}')
        if ingredient and ingredient.strip() and measure and measure.strip():
            ingredients.append(f"{measure.strip()} {ingredient.strip()}")
    return '\n'.join(ingredients)

def get_or_create_tag(name):
    tag = Tag.query.filter_by(name=name).first()
    if not tag:
        tag = Tag(name=name)
        db.session.add(tag)
    return tag

@recipe_bp.route('/recipes')
def get_recipes():
    response = Recipe.query.all()
    recipes_data = []
    for recipe in response:
        recipe_data = {
            'id': recipe.id,
            'title': recipe.title,
            'imgUrl': recipe.imgUrl,
            'description': recipe.description,
            'ingredients': recipe.ingredients,
            'instructions': recipe.instructions,
            'author': recipe.author.username,
            'tags': [tag.name for tag in recipe.tags]
        }
        recipes_data.append(recipe_data)

    print(recipes_data)
    return jsonify(recipes_data), 200

@recipe_bp.route('/recipes/<int:recipe_id>', methods=['GET'])
def get_recipe(recipe_id):
    recipe = Recipe.query.get_or_404(recipe_id)
    
    # Serialize the recipe data
    recipe_data = {
        'id': recipe.id,
        'title': recipe.title,
        'imgUrl': recipe.imgUrl,
        'description': recipe.description,
        'ingredients': recipe.ingredients,
        'instructions': recipe.instructions,
        'author': recipe.author.username,
        'tags': [tag.name for tag in recipe.tags]
    }

    return jsonify(recipe_data), 200

@recipe_bp.route('/fetch_and_save/<meal_id>', methods=['GET'])
def fetch_and_save(meal_id):
    # Fetch data from the external API
    url = f'https://www.themealdb.com/api/json/v1/1/lookup.php?i={meal_id}'
    response = requests.get(url)
    
    if response.status_code != 200:
        return jsonify({'error': 'Failed to fetch data'}), response.status_code
    
    data = response.json()
    if not data or 'meals' not in data or not data['meals']:
        return jsonify({'error': 'No data found'}), 404
    
    meal = data['meals'][0]
    #print(data)
    title = meal.get('strMeal')
    description = f"{meal.get('strCategory')} dish from {meal.get('strArea')}"
    ingredients = combine_ingredients(meal)
    instructions = meal.get('strInstructions')
    category = meal.get('strCategory')
    tags = meal.get('strTags')
    #print(title, description, ingredients, instructions, category)

    if not (title and description and ingredients and instructions):
        return jsonify({'error': 'All fields are required'}), 400
    
    # Extract relevant fields
    new_recipe = Recipe(
        title=title,
        description=description,
        ingredients=ingredients,
        instructions=instructions,
        user_id=3,
        imgUrl=meal.get('strMealThumb')
    )
    if category:
        category_tag = get_or_create_tag(category)
        new_recipe.tags.append(category_tag)

    # Add additional tags
    if tags:
        tag_list = tags.split(',')
        for tag_name in tag_list:
            tag = get_or_create_tag(tag_name.strip())
            new_recipe.tags.append(tag)

    # Save the data to the database
    db.session.add(new_recipe)
    db.session.commit()

    return jsonify(new_recipe.to_dict()), 201


@recipe_bp.route('/addrecipes', methods=['POST'])
@jwt_required()
def add_recipe():
    current_user_id = get_jwt_identity()
    data = request.get_json()
    print("Received data:", data)

    title = data.get('title')
    description = data.get('description')
    ingredients = data.get('ingredients')
    instructions = data.get('steps')

    if not (title and description and ingredients and instructions):
        return jsonify({'error': 'All fields are required'}), 400

    try:
        new_recipe = Recipe(
            title=title,
            description=description,
            ingredients=ingredients,
            instructions=instructions,
            user_id=current_user_id
        )

        db.session.add(new_recipe)
        db.session.commit()
        return jsonify(new_recipe.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


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
