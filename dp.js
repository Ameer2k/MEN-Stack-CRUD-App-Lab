const mongoose = require('mongoose')

async function connectToTheDataBase(){
    try{
        await mongoose.connect(process.env.DATABASE_URL)
        console.log('Connected to the database')
    }catch(error){
        console.log('Database connection failed:', error.name)
    }
}

module.exports = connectToTheDataBase
