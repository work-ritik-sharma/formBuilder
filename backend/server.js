const express = require('express');
const app = express();
const config = require('./config/config.js');
const mongoose = require('./config/db.js');
const formRoutes = require('./src/routes/formRoutes.js');
const cors = require('cors');

const port = config.PORT;

app.use(express.json());
app.use(cors()); 
app.use('/form', formRoutes); 

app.listen(port, function() {
  console.log('Listening on port', port);
});
