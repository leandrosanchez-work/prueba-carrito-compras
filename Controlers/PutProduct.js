const Cart = require("../Models/Cart");


const putProduct = async (req, res) =>{
    const { productId } = req.params;
    const { query } = req.query;
    const body = req.doby;


    //busca producto en el carrito
    const productBuscado = await Cart.findById(productId);


    //si no hay query 'add' o ''delete 
    if(!query){
        res.status(404).json({ mensaje: "Se debe enviar una query"})

    //si esta el producto en el carrito y lo quiero agregar   
    } else if(productBuscado && query === "add") {
        body.amount = body.amount + 1;
        
        await Cart.findByIdAndUpdate(productId, body, {
            new: true,

        }).then((product) =>{
            res.json({
                mensaje: `El producto ${product.name} fue actualizado`,
                product,
            });
        });

    }else if(productBuscado && query === "del"){
        body.amount = body.amount -1;

        await Cart.findByIdAndUpdate(productId, body, {
            new: true,
        }).then((product) =>
        res.json({
            mensaje: `El producto ${product.name} fue actualizado`,
            product,
        })
        );

    }else{
        res.status(400).json({ mensaje: "Ocurrio un error"})
    }

}

module.exports = putProduct;