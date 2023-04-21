const Cart = require("../Models/Cart");
const Product = require("../Models/Products");


const deleteProduct = async(req, res) =>{
    const { pruductId } = req.params;

    //buscamos el producto en el carrito

    const productInCart = await Cart.findById(productId);


    //buscamos el producto en nuestra DB por nombre
    const { name, img, price, _id } = await Product.findOne({
        name: productInCart.name,
    })

    //buscamos y eliminamos el producto con la id
    await Cart.findByIdAndDelete(productId);

    await Product.findByIdAndUpdate(
        _id,
        {inCart: true, name, img, price},
        {new: true}
    )

        .then((prduct) => {
            res.json({
                mensaje: `El producto ${product.name} fue eliminado`
            });
        })

        .catch((error) => res.json({mensaje: "Hubo un error"}));

}

module.exports = deleteProduct;