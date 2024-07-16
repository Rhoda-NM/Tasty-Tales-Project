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

recipes = [
    {
        "title": "Spaghetti Carbonara",
        'description': "Classic Italian pasta dish with eggs, cheese, pancetta, and pepper.",
        "ingredients": "200g spaghetti, 100g pancetta, 2 large eggs, 50g pecorino cheese, 50g parmesan, black pepper, salt",
        "instructions": "1. Cook spaghetti. 2. Fry pancetta. 3. Beat eggs with cheese. 4. Combine everything.",
        "tags": ["healthy", "vegetarian"],
        "note": "Classic Italian dish",
        "user_id": 1
    },
    {
        "title": "Chicken Tikka Masala",
        'description': "Grilled chicken pieces in a creamy, spicy tomato sauce.",
        "ingredients": "500g chicken breast, 200ml yogurt, 2 tbsp tikka masala paste, 1 onion, 2 garlic cloves, 400g tomatoes, 200ml cream",
        "instructions": "1. Marinate chicken in yogurt and tikka masala paste. 2. Grill chicken. 3. Fry onions and garlic, add tomatoes. 4. Add cream and chicken, simmer.",
        "tags": ["lunch", "dinner"],
        "note": "Pefect meal for family dinner",
        "user_id": 3
    },
    {
        "title": "Chocolate Cake",
        'description': "Rich and moist chocolate cake with a creamy chocolate frosting.",
        "ingredients": "200g flour, 200g sugar, 75g cocoa powder, 1.5 tsp baking powder, 1.5 tsp baking soda, 1 tsp salt, 2 eggs, 240ml milk, 120ml vegetable oil, 2 tsp vanilla extract, 240ml boiling water",
        "instructions": "1. Mix dry ingedients. 2. Add wet ingredients. 3. Stir in boiling water. 4. Bake. 5. Frost with chocolate frosting.",
        "tags": ["snack", "dessert"],
        "note": "Best served with a scoop of vanilla icecream",
        "user_id": 4
    },
    {
        "title": "Caesar Salad",
        'description': "Fresh romaine lettuce with Caesar dressing, croutons, and Parmesan cheese.",
        "ingredients": "1 head romaine lettuce, 100g croutons, 50g Parmesan cheese, Caesar dressing",
        "instructions": "1. Chop lettuce. 2. Toss with dressing, croutons, and cheese.",
        "tags": ["healthy", "vegetarian"],
        "note": "Easy to put together",
        "user_id": 3
    },
    {
        "title": "Beef Tacos",
        'description': "Tasty beef tacos with fresh toppings.",
        "ingredients": "500g ground beef, 1 onion, taco seasoning, taco shells, lettuce, tomatoes, cheese, sour cream, salsa",
        "instructions": "1. Cook beef with onions and seasoning. 2. Fill taco shells with beef and toppings.",
        "tags": ["quick  meal", "lunch"],
        "note": "Easy to put together",
        "user_id": 5
    },
    {
        "title": "Pancakes",
        'description': "Fluffy homemade pancakes perfect for breakfast.",
        "ingredients": "200g flour, 2 tbsp sugar, 2 tsp baking powder, 1 tsp baking soda, 1/2 tsp salt, 300ml buttermilk, 2 eggs, 4 tbsp melted butter",
        "instructions": "1. Mix dry ingredients. 2. Add wet ingredients. 3. Cook on griddle.",
        "tags": ["breakfast"],
        "note": "The perfect yummy breakfast",
        "user_id": 1
    },
    {
        "title": "Grilled Salmon",
        'description': "Delicious grilled salmon with a lemon butter sauce.",
        "ingredients": "4 salmon fillets, 2 lemons, 50g butter, salt, pepper, fresh herbs",
        "instructions": "1. Season salmon. 2. Grill salmon. 3. Make lemon butter sauce. 4. Serve with sauce.",
        "tags": ["healthy", "dinner"],
        "note": "Pefect for date night",
        "user_id": 5
    },
    {
        "title": "Vegetable Stir Fry",
        'description': "Quick and healthy vegetable stir fry with a soy sauce glaze.",
        "ingredients": "1 bell pepper, 1 broccoli head, 2 carrots, 1 onion, soy sauce, garlic, ginger, oil",
        "instructions": "1. Chop vegetables. 2. Stir fry in oil with garlic and ginger. 3. Add soy sauce.",
        "tags": ["healthy", "vegetarian"],
        "note": "Perfect side to any meal",
        "user_id": 3
    },
    {
        "title": "Banana Bread",
        'description': "Moist and flavorful banana bread with a hint of cinnamon.",
        "ingredients": "3 ripe bananas, 100g sugar, 1 egg, 75g melted butter, 200g flour, 1 tsp baking powder, 1 tsp baking soda, 1/2 tsp salt, 1 tsp cinnamon",
        "instructions": "1. Mash bananas. 2. Mix in sugar, egg, and butter. 3. Add dry ingredients. 4. Bake.",
        "tags": ["breakfast", "snack"],
        "note": "Easy and healthy bake",
        "user_id": 2
    },
    {
        "title": "Tomato Soup",
        'description': "Classic tomato soup with a creamy texture.",
        "ingredients": "800g canned tomatoes, 1 onion, 2 garlic cloves, 500ml vegetable broth, 100ml cream, salt, pepper, basil",
        "instructions": "1. Sauté onions and garlic. 2. Add tomatoes and broth. 3. Simmer. 4. Blend and add cream.",
        "tags": ["soup", "vegetarian"],
        "note": "Pefect for a chilly night",
        "user_id": 2
    },
    {
        "title": "Margarita Pizza",
        'description': "Simple and delicious pizza with tomato, mozzarella, and basil.",
        "ingredients": "Pizza dough, 200g tomato sauce, 200g mozzarella cheese, fresh basil leaves, olive oil, salt",
        "instructions": "1. Roll out dough. 2. Spread sauce, add cheese. 3. Bake. 4. Top with basil and drizzle with olive oil.",
        "tags": ["snack", "lunch"],
        "note": "Classic Italian dish",
        "user_id": 1
    },
    {
        "title": "Chicken Alfredo",
        'description': "Creamy pasta dish with grilled chicken and Alfredo sauce.",
        "ingredients": "200g fettuccine, 2 chicken breasts, 200ml cream, 50g Parmesan cheese, garlic, butter, salt, pepper",
        "instructions": "1. Cook pasta. 2. Grill chicken. 3. Make Alfredo sauce. 4. Combine pasta, chicken, and sauce.",
        "tags": ["healthy", "dinner"],
        "note": "Classic date night meal",
        "user_id": 3
    },
    {
        "title": "Greek Salad",
        'description': "Refreshing salad with tomatoes, cucumbers, olives, feta cheese, and a tangy dressing.",
        "ingredients": "3 tomatoes, 1 cucumber, 1 red onion, 100g olives, 100g feta cheese, olive oil, lemon juice, oregano, salt, pepper",
        "instructions": "1. Chop vegetables. 2. Mix dressing. 3. Toss everything together.",
        "tags": ["healthy", "vegetarian"],
        "note": "Easy to put together",
        "user_id": 2
    },
    {
        "title": "Chocolate Chip Cookies",
        'description': "Classic chewy chocolate chip cookies.",
        "ingredients": "200g flour, 1/2 tsp baking soda, 1/2 tsp salt, 100g butter, 100g sugar, 100g brown sugar, 1 egg, 1 tsp vanilla extract, 200g chocolate chips",
        "instructions": "1. Mix dry . 2. Cream butter and sugars. 3. Add egg and vanilla. 4. Combine with dry ingedients. 5. Stir in chocolate chips. 6. Bake.",
        "tags": ["snack", "dessert"],
        "note": "A classic treat",
        "user_id": 4
    },
    {
        "title": "Beef Stew",
        'description': "Hearty beef stew with vegetables.",
        "ingredients": "500g beef, 2 carrots, 2 potatoes, 1 onion, 2 garlic cloves, 500ml beef broth, salt, pepper, thyme, bay leaf",
        "instructions": "1. Brown beef. 2. Sauté vegetables. 3. Add broth and seasonings. 4. Simmer until tender.",
        "tags": ["healthy", "lunch", "diiner"],
        "note": "The perfect family dinner",
        "user_id": 3
    },
    {
        "title": "Shrimp Scampi",
        'description': "Garlic butter shrimp served over pasta.",
        "ingredients": "200g shrimp, 200g linguine, 4 garlic cloves, 50g butter, 50ml white wine, lemon juice, parsley, salt, pepper",
        "instructions": "1. Cook pasta. 2. Sauté garlic in butter. 3. Add shrimp and cook. 4. Add wine and lemon juice. 5. Combine with pasta and parsley.",
        "tags": ["sea food", "dinner"],
        "note": "Classic pasta dish",
        "user_id": 4
    },
    {
        "title": "French Toast",
        'description': "Sweet and crispy French toast perfect for breakfast.",
        "ingredients": "4 slices bread, 2 eggs, 100ml milk, 1 tsp cinnamon, 1 tsp vanilla extract, butter, syrup",
        "instructions": "1. Mix eggs, milk, cinnamon, and vanilla. 2. Dip bread in mixture. 3. Fry in butter. 4. Serve with syrup.",
        "tags": ["quick meal", "breakfast"],
        "note": "Perfect sweet breakfast",
        "user_id": 5
    },
    {
        "title": "Quinoa Salad",
        'description': "Healthy quinoa salad with vegetables and a lemon vinaigrette.",
        "ingredients": "200g quinoa, 1 cucumber, 1 bell pepper, 100g cherry tomatoes, 1 red onion, lemon juice, olive oil, salt, pepper, parsley",
        "instructions": "1. Cook quinoa. 2. Chop vegetables. 3. Mix dressing. 4. Toss everything together.",
        "tags": ["healthy", "vegetarian"],
        "note": "Perfect vegetarian dish",
        "user_id": 4
    },
    {
        "title": "Pumpkin Soup",
        'description': "Creamy pumpkin soup with a hint of nutmeg.",
        "ingredients": "800g pumpkin, 1 onion, 2 garlic cloves, 500ml vegetable broth, 100ml cream, salt, pepper, nutmeg",
        "instructions": "1. Sauté onions and garlic. 2. Add pumpkin and cook for 8mins. 3. Pour in the vegatable broth, add salt and pepper and bring to a boil, then simmmer for 10mins until the squash is soft. 4. Add cream then bring to a boil then puree. ",
        "tags": ["soup", "vegetarian"],
        "note": "The perfect dish for a cozy winter night",
        "user_id": 2
    }
]

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
    """tag_objects = {}
    for recipe_data in recipes:
        for tag_name in recipe_data['tags']:
            if tag_name not in tag_objects:
                tag = Tag(name=tag_name)
                db.session.add(tag)
                tag_objects[tag_name] = tag

    db.session.commit()
    print("Added tags to database")

    for recipe_data in recipes:
        recipe = Recipe(
            title=recipe_data['title'],
            description=recipe_data['description'],
            ingredients=recipe_data['ingredients'],
            instructions=recipe_data['instructions'],
            user_id=recipe_data['user_id']
        )
        for tag_name in recipe_data['tags']:
            recipe_tag = RecipeTag(recipe=recipe, user_note=recipe_data['note'], tag=tag_objects[tag_name])
            db.session.add(recipe_tag)
        db.session.add(recipe)

    db.session.commit()"""


if __name__ == '__main__':
    print("clearing tables")
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!

 # Create some example users
