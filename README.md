# TypeSript create AMAZON like site

Welcome to my TypeScript course to build a fully-functional e-commerce website exactly like amazon. Open your code editor and follow me for the next hours to build an e-commerce website using MERN stack (MongoDB, ExpressJS, React and Node.JS).

![amazona](/frontend/public/images/amazona.png)

## Get Course:

[https://youtu.be/-ifcPnXHn8Q](https://youtu.be/-ifcPnXHn8Q)

## Demo Website

- 👉 Render : [https://ts-amazona-final.onrender.com](https://ts-amazona-final.onrender.com)




## Run Locally

### 1. Clone repo

```
$ git clone git@github.com:basir/ts-mern-amazona.git
$ cd ts-mern-amazona
```

### 2. Create .env File

- duplicate .env.example in backend folder and rename it to .env

### 3. Setup MongoDB

- Local MongoDB
  - Install it from [here](https://www.mongodb.com/try/download/community)
  - In .env file update MONGODB_URI=mongodb://localhost/amazona
- OR Atlas Cloud MongoDB
  - Create database at [https://cloud.mongodb.com](https://cloud.mongodb.com)
  - In .env file update MONGODB_URI=mongodb+srv://your-db-connection

### 4. Run Backend

```
$ cd backend
$ npm install
$ npm start
```

### 5. Run Frontend

```
# open new terminal
$ cd frontend
$ npm install
$ npm start
```

### 6. Seed Users and Products

- Run this on browser: http://localhost:5000/api/seed
- It returns admin email and password and 6 sample products

### 7. Admin Login

- Run http://localhost:3000/signin
- Enter admin email and password and click signin


