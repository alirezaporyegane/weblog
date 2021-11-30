const path = require('path');

const express = require('express');
const morgan = require('morgan');
const dotEnv = require('dotenv');

const connectDB = require('./config/db');
const indexRoutes = require('./routes');

//* load Config
dotEnv.config({ path: "./config/config.env" })


//* DataBase Conection
connectDB()

const app = express();

//* LOGGING
if (process.env.NODE_ENV === 'development') {
  app.use(morgan("dev"));
}

//* View Engine
app.set('view engine', 'ejs');
app.set('views', 'views');

//* Static Folder
app.use(express.static(path.join(__dirname, 'public')));

//* Routes
app.use(indexRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server is Running in ${process.env.NODE_ENV} on port ${PORT}`))