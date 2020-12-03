var express = require('express');
const apis = require('./routes/index')
const bodyParser = require('body-parser');
var cors = require('cors')

var app = express();

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

app.listen(8000)

app.use(apis);
