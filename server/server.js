//Variables
const express = requrie('express');
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const listingsRouter = require('./routes/listings-router.js');
//body-parser
app.use(bodyParser.json());
//routes
app.use('/listings', listingsRouter);
//statics
app.use(express.static('server/public'));
//spin
app.listen(PORT, ()=>{
    console.log('Server running on port', PORT);
});