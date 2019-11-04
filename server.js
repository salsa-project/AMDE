const express = require('express');
const path = require('path');

const keys = require('./configs/keys');

const app = express();
const PORT = keys.PORT.PORT;

//SERVE STATIC FILES
app.use(express.static(path.join(__dirname, 'views')));

app.set('view engine', 'ejs');

app.get('/', (req,res)=>{
  res.render('index');
})

app.listen(PORT, console.log(`Server running on PORT : ${PORT}`));
