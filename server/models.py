from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    email = db.Column(db.String, nullable=False, unique=True)
    password_hash = db.Column(db.String, nullable=False)

    recipes = db.relationship('Recipes', back_populates='author')
    reviews = db.relationship('Reviews', back_populates='author')
class Recipes(db.Model, SerializerMixin):
    __tablename__ = 'recipes'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    ingredients = db.Column(db.Text, nullable=False)
    instructions = db.Column(db.Text, nullable=False)

    #relationships
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    author = db.relationship('User', back_populates='recipes')
    ratings = db.relationship('Rating', back_populates='recipe')
    reviews = db.relationship('Reviews', back_populates='recipe')
    recipe_tag = db.relationship('RecipeTag', back_populates='recipe')
    # Association proxy to get tags for this recipe through recipetag
    tags = association_proxy('recipe-tags', 'tags',
                                  creator=lambda tag_obj: RecipeTag(tag=tag_obj))


    @property
    def average_rating(self):
        if self.ratings:
            return sum(rating.score for rating in self.ratings) / len(self.ratings)
        return None

class Reviews(db.Model, SerializerMixin):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String, nullable=False)

    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'))
    recipe = db.relationship('Recipe', back_populates='ratings')
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    author = db.relationship('User', back_populates='reviews')
class Rating(db.Model, SerializerMixin):
    __tablename__ = 'ratings'

    id = db.Column(db.Integer, primary_key=True)
    score = db.Column(db.Integer, nullable=False)

    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'))
    recipe = db.relationship('Recipe', back_populates='ratings')
class Tags(db.Model, SerializerMixin):
    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable = False)
    recipe_tag = db.relationship('RecipeTag', back_populates='tag')

    # Association proxy to get recipes for this tag through recipetag
    recipes = association_proxy('recipe-tags', 'recipe',
                                  creator=lambda recipe_obj: RecipeTag(recipe=recipe_obj))

class RecipeTag(db.Model, SerializerMixin):
    __tablename__ = 'recipe-tags'

    id = db.Column(db.Integer, primary_key=True)
    user_note = db.Column(db.String)

    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'))
    tag_id = db.Column(db.Integer, db.ForeignKey('tags.id'))
    # Relationship mapping the recipetag to related recipe
    recipe = db.relationship('Recipe', back_populates='recipe_tags')
    # Relationship mapping the recipetag to related tag
    tag = db.relationship('Tags', back_populates='recipe_tags')

    