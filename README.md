# Cook up a Storm! Food App

Web application that uses the spoonacular api to create meal plans and lookup recipes.

## Description

The aim of this project was to use the Spoonacular API () to do the following:
- Create a user and store preferences to use the App
- Generate day and week meal plans
- Search for recipes based on a set of search criteria
- Allow recipes to be imported using URL to recipes on the web

## Getting Started

### Installing the code

Clone the repository and do the following to get started:
* In the root directory:
`npm install` - this will pull in all the dependencies required by the `server`
* cd to client directory:
```
cd client
npm install
```
this will install the dependencies for the `client`

### Setting up Spoonacular account

In order to access the Spoonacular API you will have to create an account and get an API KEY. Go here to set up a free plan:

https://spoonacular.com/food-api/console#Plan

In order to utilise the API you will have to set up an environment variable in your `.emv.prod` file in the `server` directory. See the next section for further information about the environment file.

### Setting up a database and env file

There is a file called `create_mealapp_db.sql` in the `/server/src/scripts` directory which provides all the setup required for installing the necessary tables in a Postgres database. Run this script connected as the root db user.

In order to utilise your lovely new database you will need to provide an environment file called `.env.prod` in the server directory. It should look something like this:
```
PORT=3000
SPOONACULAR_API_KEY=149888bade0e4d0d9b8be8d5a29d8736
DB_NAME=mealapp
DB_USERNAME=mealappuser
DB_PASSWORD=<password-you-used-to-create-user>
DB_HOST=localhost
DB_PORT=5432
DB_DIALECT=postgres
```

### Executing program

#### Startup client and server

* to run the client on its own do the following in the root directory:
```
npm run start-client
```
* to run the server on its own do the following in the root directory:
```
npm run start-server
```
* to run the client and server concurrently do the following in the root directory:
```
npm run start
```
#### to run tests

* to run client tests:
```
npm test-client
```
This runs client tests in watch mode.

* to run server tests:
```
npm test-client
```
This runs server tests in watch mode.

## API Endpoints

| Request | Verb | URL | Params | Body Example |
|---|---|---|---|---|
| GetUser | GET | http://localhost:3000/api/v1/user | email, password |   |
| CreateUser | POST  | http://localhost:3000/api/v1/user  |   | {"email": "me@email.com", "first_name": "bob","last_name": "Smith","password": "password"} | 
| GetUserPrefs  | GET  | http://localhost:3000/api/v1/userPrefs  | user_id  |   |
| GetUserPref  | GET | http://localhost:3000/api/v1/userPrefs/{pref_name} | user_id  |   |
| UpdateUserPref  | PUT | http://localhost:3000/api/v1/userPrefs/{pref_name} | user_id | {"pref_value": 3008}  |
| UpdateUserPrefs  | PUT | http://localhost:3000/api/v1/userPrefs |  user_id | [{"pref_id": 2, "pref_name": "calories", "pref_value": "2500", "user_id": 36 }, {"pref_name": "cuisines", "pref_value": "French, British", "user_id": 36}] |
| CreatePref  | POST |  http://localhost:3000/api/v1/userPrefs | user_id | {"pref_name": "calories","pref_value": "1500", "user_id": 36} |


## Authors

The following contributed to this project:

- Jagath Ariyananda
- Nigel Faria
- Dave Goldsmith
- meenashi Jeyanthinatha Subramanian


## Acknowledgments

* https://spoonacular.com/food-api/docs
