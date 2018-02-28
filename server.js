const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db         = require('./config/db');
const port = 8000;

const app = express();

// url encoded with body parser
app.use(bodyParser.urlencoded({ extended: true }));

// Database connect using MongoClient
MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err);

  // Routes export
  require('./app/routes')(app, database);

  app.listen(port, () => console.log(`Server is running on ${port}....`));
});
