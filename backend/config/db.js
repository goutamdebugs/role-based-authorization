const mongoose = require('mongoose')

const dbconnect = async (params) => {
     try {
        await mongoose.connect('mongodb://localhost:27017/RBA')
        console.log('database connection succesfully...')
     } catch (error) {
        console.log(error)
     }
}

module.exports = dbconnect