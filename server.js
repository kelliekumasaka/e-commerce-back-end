const express = require('express');
const routes = require('./routes');
const sequelize = require("./config/connection.js");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
  console.log('App listening on PORT ' + PORT);
  });
});