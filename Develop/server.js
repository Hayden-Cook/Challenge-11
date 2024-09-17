const express = require('express');
const path = require('path');
const fs = require('fs');

const apiRoute = require('./routes/apiRoute');
const htmlRoute = require('./routes/htmlRoute');

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRoute);
app.use('/', htmlRoute);


app.listen(PORT, () => 
  console.log(`App listening at http://localhost:${PORT}`)
);