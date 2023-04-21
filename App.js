const express = require('express');
const cors = require('cors');


const db = require('./Database');
const controllers = require("./Controlers")


const app = express();


app.use(cors());
app.use(express.json());

//get

app.get("/products", controllers.getProducts);
app.get("/products-cart", controllers.getProductsCart);


//post

app.post("/products-cart", controllers.appProductCart);

//put

app.put("/products-cart/:productId", controllers.putProduct);

//delete
app.delete("/products-cart/:productId", controllers.deleteProduct);


//port
app.listen(8080, () =>{
    console.log("servidor escuchando en puerto 8080")
    db()
})


module.exports = app;