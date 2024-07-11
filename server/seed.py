#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db,app
from models import User

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
new_user = User(username='Moringa', email='moringa@gmail.com')
new_user.set_password('password123')
db.session.add(new_user)
db.session.commit()