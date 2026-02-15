const express = require('express')
const cors = require('cors')

const dbconnect = require('./config/db')
const router = require('./routers/auth.router')

const app = express()
app.use(express.json())
app.use(cors())

// database connection call
dbconnect()

app.get('/',(req,res)=>{
    res.status(200).json({
        message: "your server is running --"
    })
})

app.use('/api',router)


const port = 7000
app.listen(port,()=>{
    console.log('port is running http://localhost:7000')
})