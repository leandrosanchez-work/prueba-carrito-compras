const mongoose = require('mongoose');

const MONGO_URL = "mongodb+srv://prueba1:ADMIN@cluster0.kjadlr1.mongodb.net/?retryWrites=true&w=majority"


const db = async () =>{
    await mongoose
    .connect(MONGO_URL)
    .then(() => console.log("DB FUNCIONANDO"))
    .catch((error) => console.error(error))
}

module.exports = db; 