const connectToMongo=require('./db');
const express = require('express');
const dotenv=require('dotenv');

var cors = require('cors');
connectToMongo();

const app = express();

dotenv.config({path:"../backend/config/config.env"});


app.use(cors());
app.use(express.json());
app.get('/', (req, res)=>{
    res.json("hee");
})
//availabe routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(process.env.PORT, () => {
    console.log(`Notebook app listening at http://localhost:${process.env.PORT}`)
  })