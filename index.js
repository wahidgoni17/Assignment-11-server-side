const express = require('express');
const cors = require('cors')
const app = express()
const port = process.env.meta || 4000
// dotenv
require('dotenv').config()
// middleware
app.use(cors())
app.use(express.json())

app.get('/', (req, res)=>{
    res.send('babies playing with toy here')
})
app.listen(port, ()=>{
    console.log(`babies playing here ${port}`)
})