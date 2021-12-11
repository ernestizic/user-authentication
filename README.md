# Pawfinder backend task

## Backend functions

User authentication to enable the given login screen work (Figma design login screen)

## Tech Stack
<p>
<img src="https://img.shields.io/badge/-Expressjs%20-%23323330?style=for-the-badge&logo=express">
<img src="https://img.shields.io/badge/-MongoDB%20-1AA121?style=for-the-badge&logo=mongodb&logoColor=green">
<img src="https://img.shields.io/badge/jsonwebtoken%20-%2320232a.svg?&style=for-the-badge&logo=jwt" >   
</p>

- [Nodejs](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/) - Nodejs framework
- [MongoDB](https://mongodb.com/) - For storge
- [JWT](https://jwt.io/) - For authorization
- [Passportjs](http://www.passportjs.org/) - For Authentication and Authorization

## API endpoints

- User Registration http://localhost:5000/user/register
- User Login http://localhost:5000/user/login
- User Details http://localhost:5000/user/userdata


## Env Variables
Create a .env file in then root and add the following

```sh
SECRET_KEY = 'yoursecretkey'
MONGO_URI = your mongodb uri 
```
### Usage

```sh
$ npm install
```

```sh
$ npm start
# Or run with Nodemon
$ npm run dev
# Visit http://localhost:5000
```

### MongoDB

Open "configs/db.js" and add your MongoDB URI, local or Atlas