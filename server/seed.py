#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db
from models import User, Recipe, Rating, Review, RecipeTag, Tag
from recipe import fetch_and_save



with app.app_context():
    # Drop all tables
    db.drop_all()
    # Create all tables
    db.create_all()

    user1 = User(username='alice', email='alice@example.com')
    user1.set_password('Password123!')

    user2 = User(username='bob', email='bob@example.com')
    user2.set_password('Password123!')

    user3 = User(username='charlie', email='charlie@example.com')
    user3.set_password('Password123!')

    user4 = User(username='david', email='david@example.com')
    user4.set_password('Password123!')

    user5 = User(username='eve', email='eve@example.com')
    user5.set_password('Password123!')

    # Add the users to the session
    db.session.add(user1)
    db.session.add(user2)
    db.session.add(user3)
    db.session.add(user4)
    db.session.add(user5)

    # Commit the session to the database
    db.session.commit()
    print('Database seeded with example users!')
    
    meal_ids = ["52819","52783", "52780", "52772", "53046", "52882", "53019", "52773" , "52774", "52775", "52776", "53020", "53021",
                "53045", "53047", "52934", "52935", "52936", "52877", "52875", "52876", "52878", "52879", "52880", 
                "52788", "52789", "52790", "52781", "52782", "52781", "52784", "52781", "52785", "52787", "52786",
                "52909", "52910", "52911", "52912", "52913", "52915", "52819", "52820", "52815", "52816", "52817", "52818",
                "52920", "52921", "52922", "52923", "52924", "52925", "52926"]  # Add your meal IDs here

    for meal_id in meal_ids:
        result, status = fetch_and_save(meal_id)
        if status == 201:
            print(f'Successfully added recipe with meal ID: {meal_id}')
        else:
            print(f'Failed to add recipe with meal ID: {meal_id}.')
 


if __name__ == '__main__':
    print("clearing tables")
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!

 # Create some example users
