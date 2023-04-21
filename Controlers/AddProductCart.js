const Cart = require("../Models/Cart")
const Product = require("../Models/Products")


const addProductCart = async (req, res) =>{
    const{ name, img, price } = req.body;


//verifica si esta el producto
const estaEnProducts = await Product.findOne( { name });

//verifica si los campos tiene valor
const noEstaVacio = name !== "" && img !== "" && price !== "";

//verifica si ya esta en el carrito el producto
const estaEnElCarrito = await Cart.findOne({ name });

//si no esta el producto

if (!estaEnProducts){
    res.status(400).json({
        mensaje: "No se encontro producto en la base de datos"
    });

    //si agregan un producto que no esta, se agrega
} else if (noEstaVacio && !estaEnElCarrito) {
    const newProductoInCart = new Cart({name, img, price, amount: 1 })


    //actulizamos la prop inCart: true en los productos
    await Product.findByIdAndUpdate(
        estaEnProducts?._id,
        {inCart: true, name, img, price},
        {new: true}
    )
    
    .then((product) => {
        newProductoInCart.save();
        res.json({
            mensaje: `Producto añadido al carrito`,
            product,
        });
    })
    .catch((error) => console.log(error));
    }else if (estaEnElCarrito){

         res.status(400).json({
        mensaje: "El preoducto ya esta en el carrito",
    });
    }
};


