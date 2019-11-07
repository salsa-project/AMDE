const express = require('express');
const path = require('path');

const keys = require('./configs/keys');
const routes = require('./routes/routes');

const app = express();
const PORT = keys.PORT.PORT;

//SERVE STATIC FILES
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.set('view engine', 'ejs');

app.use('/', routes);

app.listen(PORT, console.log(`Server running on PORT : ${PORT}`));
