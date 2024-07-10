from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!
class User(db.Model):
    pass
class Recipes(db.Model):
    pass
class Reviews(db.Model):
    pass
class Users(db.Model):
    pass
class Tags(db.Model):
    pass