# Tasty-Tales-Project

## Overview
Tasty-Tales is a full-stack application built with Flask and React. It allows users to create, manage, and share recipes. The backend is developed using Flask, while the frontend is built with React.

## Features
- User authentication and authorization
- CRUD operations for recipes
- Search functionality for recipes
- User profile management
- Responsive design

## Installation

### Backend (Flask)
1. Clone the repository:
    ```sh
    git clone https://github.com/Rhoda-NM/Tasty-Tales-Project.git
    cd Tasty-Tales-Project/server
    ```

2. Set up a virtual environment:
    ```sh
    pipenv install
    pipenv shell
    ```

3. Apply migrations:
    ```sh
    flask db init
    flask db migrate
    flask db upgrade
    ```

4. Run the server:
    ```sh
    python app.py
    ```

### Frontend (React)
1. Navigate to the client directory:
    ```sh
    cd ../client
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Start the React app:
    ```sh
    npm start
    ```

## Usage
- Access the application at `http://localhost:3000`
- Use Postman or any API client to interact with the backend at `http://localhost:5555`

## API Endpoints

### Auth
- `POST /login` - Log in a user with username and password
- `POST /register` - Register a new user

### Recipes
- `GET /recipes` - Get all recipes
- `POST /recipes` - Create a new recipe
- `GET /recipes/:id` - Get a specific recipe
- `PUT /recipes/:id` - Update a recipe
- `DELETE /recipes/:id` - Delete a recipe

## Models
### User
- `id` (Integer): Primary key
- `username` (String): Unique username
- `password` (String): User password (hashed)
- `recipes` (Relationship): One-to-many relationship with recipes

### Recipe
- `id` (Integer): Primary key
- `title` (String): Recipe title
- `instructions` (Text): Cooking instructions
- `minutes_to_complete` (Integer): Time required to complete the recipe
- `user_id` (Integer): Foreign key to the user

## Troubleshooting
### Common Issues
- Ensure the virtual environment is activated before running backend commands.
- Check if the frontend and backend servers are running on the correct ports.

## Contributing
1. Fork the repository
2. Create a new branch (`git checkout -b feature-foo`)
3. Commit your changes (`git commit -am 'Add some foo'`)
4. Push to the branch (`git push origin feature-foo`)
5. Create a new Pull Request

## License
This project is licensed under the MIT License. See the [LICENSE.md](LICENSE.md) file for details.
