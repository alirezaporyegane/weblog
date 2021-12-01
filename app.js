const path = require('path');

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const morgan = require('morgan');
const dotEnv = require('dotenv');

const connectDB = require('./config/db');
const blogRoutes = require('./routes/blog');
const dashboardRoutes = require('./routes/dashboard');

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
app.set('layout', "./layouts/mainLayouts")
app.use(expressLayout);

//* Static Folder
app.use(express.static(path.join(__dirname, 'public')));


//* Routes
app.use('/dashboard', dashboardRoutes)
app.use(blogRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server is Running in ${process.env.NODE_ENV} on port ${PORT}`))