const express = require('express');

const router = express.Router();
const cartManager = require("../src/CartManager.js");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

//setup

async function createCart(req, res) {
    const data = req.body;

    //USO: publicar como una matriz JSON, es decir, ["Prueba", "Prueba2", "Prueba3"]
    //Se deben utilizar los ID de productos existentes; de lo contrario, las matrices del carrito estarán vacías.

    //Crea una instancia de carrito y agregale los elementos del cuerpo de la solicitud.
    const cart = await cartManager.instance.createCart(data)

    try {
        if (cart) {
            res.send(cart);
        } else {
            res.send("Could not create cart");
        }
    } catch (error) {
        console.error('Error creating cart:', error.message);
        res.status(500).send(`Internal Server Error ${error}`);
    }
}

async function getCartInfo(req, res) {
    const id = req.params.cid;
    const cart = await cartManager.instance.getCart(id);

    try {
        if (cart) {
            res.send(cart);
        } else {
            res.send("Cart not found");
        }
    } catch (error) {
        console.error('Error retrieving cart:', error.message);
        res.status(500).send(`Internal Server Error ${error}`);
    }
}

async function addToCart(req, res) {
    const cartID = req.params.cid;
    const data = req.params.pid;

    const cart = await cartManager.instance.addToCart(cartID, data);

    try {
        if (cart) {
            res.send(cart);
        } else {
            res.send("Could not update cart");
        }
    } catch (error) {
        console.error('Error creating cart:', error.message);
        res.status(500).send(`Internal Server Error ${error}`);
    }

}

//Punto final para agregar un nuevo carrito
router.post('/api/carts/', createCart);
// Punto final para obtener un carrito con sus productos
router.get('/api/carts/:cid', getCartInfo);
// Punto final para agregar un producto a un carrito específico
router.post('/api/carts/:cid/product/:pid', addToCart);

module.exports = router;