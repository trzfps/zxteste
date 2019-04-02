const express = require('express'),
      bodyParser = require('body-parser'),
      consign = require('consign');

let app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));

consign()
    .include('app/routes')
    .then('app/controllers')
    .then('app/models')
    .into(app)

module.exports = app
