**Tasty Tales Project**
=======================

## Table Of Contents

1.  Introduction

2.  Installation

3.  Running the Application
    
4.  Usage
    
5.  Features
    
6.  Project Structure
    
    *   Client Side
        
    *   Server Side
        
7.  Deployment

8.  Technologies Used
    
9.  Contributing
    
10.  License
    

## Introduction


Welcome to the Tasty Tales Project. This project is a web application that allows users to browse, search, and review recipes. The application consists of a frontend built with React and a backend built with Flask-SQLAlchemy. Users can register, log in, view recipes, leave reviews, and manage recipe tags.



## Setup and Installation


To set up the project, follow these steps:

1.  Clone the repository: **git clone https://github.com/Rhoda-NM/Tasty-Tales-Project.git**
    
2.  Install the dependencies: **pipenv install** (for the server) and **npm install** (for the client)
    
3.  Create a new SQLite database: **sqlite3 tasty\_tales.db**
    

## Running the Application


To run the application, follow these steps:

1.  Clone the Repository: Clone the repository using **git clone https://github.com/Rhoda-NM/Tasty-Tales-Project.git**
    
2.  Navigate to the Project Directory: Navigate to the project directory using **cd Tasty-Tales-Project**
    
3.  Start the server(backend)**: python app.py**
    
4.  In a separate terminal, start the client(frontend)**: npm start**
    


# Usage

## How it Works


To use the Tasty Tales Project app on the client-side, follow these steps:

### Navigation

1.  Open the app in your browser: **http://localhost:3000**
    
2.  Click on the navigation links in the navbar to access different pages:
    
    *   **Home**: Displays the app's homepage with a banner, success stories, and developer information.
        
    *   **Recipes**: Displays a list of all recipes with filtering and searching capabilities.
        
    *   **Add Recipe**: Allows logged-in users to create a new recipe (only visible after login).
        
    *   **Coin Balance**: Displays the user's current coin balance and profile image (only visible after login).
        
    *   **Logout**: Logs the user out of the app (only visible after login).
        

### Recipe Interactions

1.  **Browse Recipes**: On the **Recipes** page, you can:
    
    *   Filter recipes by category and country using the dropdown menus.
        
    *   Search for recipes by title using the search bar.
        
    *   Scroll through the list of recipes with infinite scrolling.
        
2.  **View Recipe Details**: Click on a recipe to view its details, including:
    
    *   Recipe title, image, and description.
        
    *   Ingredients and instructions.
        
    *   Reaction buttons (like, love, etc.).
        
    *   Suggestions for other recipes in the same category or from the same country.
        
3.  **React to Recipes**: Logged-in users can react to recipes using the reaction buttons.
    

### User Profile 

1.  **Login**: Click on the **Login** button in the navbar to log in to the app.
    
    
2.  **Add Recipe**: Logged-in users can create a new recipe by clicking on the **Add Recipe** button in the navbar.
    

### Searching and Filtering

1.  **Search Bar**: Use the search bar on the **Recipes** page to search for recipes by title.
    
2.  **Filtering**: Use the dropdown menus on the **Recipes** page to filter recipes by category and country.
    

## Key Features


*   User registration and authentication
    
*   Browse and search for recipes
    
*   View detailed recipe information
    
*   Add and manage reviews
    
*   Tag management for recipes
    

## Project Structure


The project is divided into two main folders: **client** and **server**.


## Client - Frontend (React)

The frontend code is located in the `client` directory and is responsible for rendering the user interface and handling user interactions.


## Components

### Components Folder

The `components` folder contains reusable React components that are used throughout the application. Each component is organized into its own subfolder and includes a corresponding CSS file for styling.

#### Header Component

- **Description**: Renders a navigation bar with links to the home page, login page, and recipes page.
- **Features**: Uses `react-router-dom` for client-side routing.

#### Home Component

- **Description**: Renders the home page with a hero section, background image, title, and call-to-action button.
- **Features**: Uses the `useState` hook to manage the button text state.

#### Login Component

- **Description**: Renders a login form with input fields for username and password, and a submit button.
- **Features**: Uses the `useState` hook to manage input field states and the `useHistory` hook for redirecting to the home page after successful login.

#### Nav Component

- **Description**: Renders a navigation menu with links to the home page, login page, and recipes page.
- **Features**: Uses `react-router-dom` for client-side routing.

#### Recipes Component

- **Description**: Renders a list of recipes fetched from an API.
- **Features**: Uses the `useState` hook to manage recipe state and the `useEffect` hook to fetch recipes on mount.

#### User Component

- **Description**: Renders a user profile page with information about the logged-in user.
- **Features**: Uses the `useState` hook to manage user information state and the `useHistory` hook for redirecting to the login page if not logged in.

### Components/Recipes

The `components/recipes` folder contains components related to recipe display and management.


#### EditRecipe Component

- **Description**: Renders a form for editing a recipe.
- **Features**:
  - Uses `useState` hook to manage form state.
  - Uses `useEffect` hook to fetch existing recipe details on mount.


#### RecipeCard Component

- **Description**: Renders a card displaying a recipe's title, image, and description.
- **Features**: Uses `react-router-dom` for client-side routing to the recipe detail page.

#### RecipeDetail Component

- **Description**: Renders a detailed view of a recipe, including title, image, description, and instructions.
- **Features**:
  - Uses `useState` hook to manage recipe information state.
  - Uses `useParams` hook to fetch recipe ID from URL parameters.
  - Uses `useEffect` hook to fetch recipe details on mount.
#### Recipes Component

- **Description**: Renders a list of recipe cards fetched from an API.
- **Features**:
  - Uses the `useState` hook to manage recipe state.
  - Uses the `useEffect` hook to fetch recipes on mount.

#### RecipeForm Component

- **Description**: Renders a form for creating or editing a recipe.
- **Features**: Uses the `useState` hook to manage form state and the `useHistory` hook for redirecting to the recipe list page after submission.

#### Review Component

- **Description**: Renders a list of reviews for a specific recipe.
- **Features**: Uses `useState` hook to manage reviews state.
  
#### Search Component

- **Description**: Provides a search bar to filter recipes by name or ingredients.
- **Features**:
  - Uses `useState` hook to manage search input state.
  - Uses `useEffect` hook to filter recipes based on search query.


### Components/User

The `components/user` folder contains components related to user management.

#### LoginForm Component

- **Description**: Renders a login form with input fields for username and password, and a submit button.
- **Features**: Uses `useState` hook to manage input field state.
  

#### UserProfile Component

- **Description**: Renders a user profile page with information about the logged-in user.
- **Features**: Uses the `useState` hook to manage user information state and the `useHistory` hook for redirecting to the login page if not logged in.

#### UserForm Component

- **Description**: Renders a form for creating or editing a user profile.
- **Features**: Uses the `useState` hook to manage form state and the `useHistory` hook for redirecting to the user profile page after submission.



### Other Files

- **axios.js**: Exports functions for making API requests to the backend server.

- **index.js**: The entry point of the application that renders the App component to the DOM.

- **styles/**: Contains global CSS styles for the application.

## Server - Backend (Flask)

The backend code is located in the `server` directory and is responsible for handling API requests, interacting with the database, and providing data to the frontend.

### API Endpoints

#### Authentication

- **POST /signup**: Registers a new user. Requires `userName`, `email`, and `password` in the request body.
- **POST /login**: Authenticates a user and returns a JWT access token. Requires `email` and `password` in the request body.
- **DELETE /delete_user**: Deletes the currently logged-in user. Requires a valid JWT token.
- **GET /userinfo**: Retrieves the profile of the currently logged-in user. Requires a valid JWT token.
- **PUT /update_user**: Updates the profile of the currently logged-in user. Requires a valid JWT token. Accepts `email` and `username` in the request body.

#### Recipes

- **GET /recipes**: Retrieves a list of all recipes.
- **GET /recipes/<int:recipe_id>**: Retrieves a single recipe by ID.
- **POST /recipes**: Creates a new recipe. Requires a valid JWT token. Accepts `title`, `imgUrl`, `description`, `ingredients`, `instructions`, and `tags` in the request body.
- **PUT /recipes/<int:id>**: Updates an existing recipe. Requires a valid JWT token. Accepts `title`, `description`, `instructions`, `ingredients`, and `imgUrl` in the request body.
- **DELETE /recipes/<int:id>**: Deletes a recipe by ID. Requires a valid JWT token.

#### Comments and Ratings

- **POST /recipes/<int:id>/comments**: Adds a comment to a recipe. Requires a valid JWT token. Accepts `content` in the request body.
- **POST /recipes/<int:id>/ratings**: Adds a rating to a recipe. Requires a valid JWT token. Accepts `score` in the request body.

#### Search

- **GET /search**: Searches for recipes by title or ingredients. Requires a `q` query parameter.

### Database

The application uses SQLAlchemy for ORM and a SQL database (e.g., PostgreSQL, SQLite). The database schema includes models for `User`, `Recipe`, `Tag`, `Review`, and `Rating`.

### Security

The application uses JWT (JSON Web Tokens) for authentication and authorization. The JWT configuration is managed using `flask_jwt_extended`.

### Error Handling

The application includes custom error handling for various error types. Error responses are returned with appropriate HTTP status codes and error messages.

## Technologies Used

### Frontend

- **React**: For building the user interface.
- **React Router**: For client-side routing.
- **Axios**: For making HTTP requests to the backend API.
- **CSS**: For styling the components.
- **Formik**:
- **Bootstrap**:

### Backend

- **Flask**: A lightweight WSGI web application framework for Python. Used for creating the server-side API and handling HTTP requests.
- **Flask-SQLAlchemy**: An extension for Flask that adds support for SQLAlchemy, an SQL toolkit and Object-Relational Mapping (ORM) library for Python.
- **Flask-Migrate**: A Flask extension that handles SQLAlchemy database migrations, allowing schema changes to be managed more effectively.
- **Flask-JWT-Extended**: Provides JSON Web Token (JWT) support for Flask, enabling secure authentication and authorization.
- **SQLAlchemy**: An ORM for Python that provides a set of high-level API for interacting with relational databases.
- **Requests**: A simple HTTP library for Python used to fetch data from external APIs.


### Database

- **SQLite**: A self-contained, high-reliability, embedded, full-featured, public-domain, SQL database engine. Used for storing the application's data in a lightweight and efficient manner.




## Contribution

Contributions are welcome! To contribute to the project, follow these steps:

1.  Fork the repository
    
2.  Create a new branch **(git checkout -b feature/your-feature-name)**
    
3.  Commit your changes **(git commit -am 'Add some feature')**
    
4.  Push to the branch **(git push origin feature/your-feature-name)**
    
5.  Create a new Pull Request
    

## License

This project is licensed under the MIT License.