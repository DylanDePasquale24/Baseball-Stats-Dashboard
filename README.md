# Player Stats Dashboard

## Overview
The Player Stats Dashboard is a full-stack application that processes, stores, and visualizes baseball player statistics. It features an ETL pipeline, a Django REST API, and a React frontend that allows users to search for player statistics and view their performance over multiple years.

## Features
- **ETL Pipeline:** A Python script extracts player data from a JSON file, transforms it, and loads it into a SQLite database.
- **Django Backend API:** Exposes endpoints for retrieving player statistics based on search queries.
- **React Frontend:** Provides an interactive UI where users can search for players by first name and/or last name and view their pitching or batting stats across multiple seasons.
- **Asynchronous Data Fetching:** The frontend dynamically fetches player data via API calls.

## Setup Instructions

### 1. Install Dependencies
Beginning at the root directory perform the following.
1. Install frontend dependencies 
    ```console
        cd frontend
        npm install axios
    ```
2. Install backend dependencies
   ```console
        cd RoyalsProject
        pip install django djangorestframework
        pip install django-cors-headers
    ```

My Versions:
- python: 3.11.9
- node: 18.13.0
- npm: 8.19.3

### 2. Perform the ETL Process 
The player statistics data is stored in a JSON file in the RoyalsProject/players.json directory. To load this data into the SQLite database, you can execute the following commands, beginning from the root directory. 

1. Navigate into the Backend folder and migrate the schema structure
    ```console
    cd RoyalsProject
    python manage.py makemigrations app
    python manage.py migrate
    ```

2. In the same directory, run the ETL script to load the JSON data into your SQLite database
    ```console
    python ETL.py
    ```


### 3. Run The Application
Now that your database is set up, it is time to run the application. Navigate to the project root directory and execute the following.

1. Open a new terminal and navigate into the frontend folder to start the React app
    ```console
    cd frontend
    npm start
    ```

2. Open a second terminal and navigate into the backend folder to run the backend server
    ```console
    cd RoyalsProject
    python manage.py runserver
    ```
The frontend UI should automatically open in your browser and you can begin searching players.

### 4. Trying an Example
 A good example to start with is try searching "Ch" in the first name field and notice how every player that has a first name with the letters "Ch" will appear. You can narrow the search by completing the name "Chad" "Green" to view a particular player. From there, you can view both pitching and batting stats per season by clicking and bringing up the respective popup window. 