const express = require("express");
const productManager = require("./src/ProductManager");

const port = 3000;
const app = express();

// Función para manejar productos individuales por ID
async function getProductByID(req, res) {
    const productID = req.params.pid;

    try {
        const product = await productManager.instance.getProductByID(productID);
        if (product) {
            res.send(product);
        } else {
            res.send(`<h1>Product not found</h1>`);
        }
    } catch (error) {
        console.error('Error getting product by ID:', error.message);
        res.status(500).send('Internal Server Error');
    }
}

// Función para manejar lista de productos con límite
async function getProductsByLimit(req, res) {
    const limit = req.params.limit;

    try {
        const products = await productManager.instance.getProducts(limit);
        res.send(products);
    } catch (error) {
        console.error('Error getting products by limit:', error.message);
        res.status(500).send('Internal Server Error');
    }
}

// Punto final para obtener un producto por su ID
app.get('/product/:pid', getProductByID);

// Punto final para obtener una lista de productos según un límite proporcionado
app.get('/products/:limit', getProductsByLimit);

app.listen(port, () => console.log("Server started and running"));