const express = require('express');

const router = express.Router();
const productManager = require("../src/ProductManager.js");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

//setup

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
        res.status(500).send(`Internal Server Error ${error}`);
    }
}

// Función para manejar lista de productos con límite
async function getProductsByLimit(req, res) {
    const limit = req.query.limit;

    try {
        const products = await productManager.instance.getProducts(limit);
        res.send(products);
    } catch (error) {
        console.error('Error getting products by limit:', error.message);
        res.status(500).send(`Internal Server Error ${error}`);
    }
}

async function addProduct(req, res) {
    const data = req.body; // Usa req.body para obtener datos del cuerpo de la solicitud
    console.log(data);
    try {
        const product = await productManager.instance.addProduct(data);

        if(product.success) {
            res.send("Product added successfully");
        } else {
            res.send("The product could not be added");
        }

    } catch (error) {
        console.error('Error adding product:', error.message);
        res.status(500).send(`Internal Server Error ${error}`);
    }
}

async function updateProductByID(req, res) {
    const data = req.body;
    const id = req.params.pid;

    try {
        const updateResult = await productManager.instance.updateProduct(id, data);
        if (updateResult.success) {
            res.send(`Item with ID ${id} updated successfully, ${data}`);
        } else {
            res.status(404).send(`Product with ID ${id} not found.`);
        }
    } catch (error) {
        console.error('Error updating product:', error.message);
        res.status(500).send(`Internal Server Error ${error}`);
    }
}

async function deleteProductByID(req, res) {
    const id = req.params.pid;

    try {
        const deletionResult = await productManager.instance.deleteProductByID(id);

        if (deletionResult.success) {
            res.send(`Item with ID ${id} removed successfully.`);
        } else {
            res.status(404).send(`Product with ID ${id} not found.`);
        }
    } catch (error) {
        res.status(500).send(`Internal Server Error: ${error.message}`);
    }
}

// Punto final para obtener una lista de productos según un límite proporcionado
router.get('/api/products/', getProductsByLimit);
// Punto final para obtener un producto por su ID
router.get('/api/products/:pid', getProductByID);
//Punto final para agregar un nuevo producto
router.post('/api/products/', addProduct);
//Punto final para actualizar un producto existente
router.put('/api/products/:pid', updateProductByID);
//Punto final para eliminar un producto de la base de datos
router.delete('/api/products/:pid', deleteProductByID)

module.exports = router;