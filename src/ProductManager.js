const initialProducts = [
    { title: "first item", description: "Product 1", code: "ABC", price: 200, stock: 0, thumbails: [""], category: "uncategorized", id: "", },

];

const fs = require('fs');
const crypto = require('crypto');

class ProductManager {
    constructor(path) {
        console.log("Product manager initialized");

        this.path = path;
        // Lee los productos iniciales del archivo o crea una matriz vacía
        this.initialize();
    }

    async initialize() {
        // Lee los productos iniciales del archivo o crea una matriz vacía
        const data = await this.readProductsFromFile();
        this.productArray = data || [];

        // Agrega todos los productos iniciales a la matriz de productos
        // espera a esto.addProducts(initialProducts);
    }


    // Función hash para generar la identificación del producto
    generateID(product) {
        const idData = `${product.title}${product.price}${product.code}${product.description}${Math.random()}`;
        const hash = crypto.createHash('md5').update(idData).digest('hex');
        product.id = hash.toUpperCase();
    }

    validateProduct(product) {
        // Genera una identificación para este producto
        this.generateID(product);

        // Comprobar si el producto tiene las propiedades obligatorias
        if (!product.title || !product.description || !product.code || !product.price || !product.category ||parseInt(product.price) <= 0 || parseInt(product.stock) < 0) {
           
            return false;
        }

        const isCodeDuplicate = this.productArray.some(prod => prod.code === product.code);
        const isIDDuplicate = this.productArray.some(prod => prod.id === product.id);

        // Compruebe si una ID o CÓDIGO está duplicada
        if (isCodeDuplicate || isIDDuplicate) {
            return false;
        }


        product.status = true;
        // Devuelve true si todos los campos son válidos
        return true;
    }

    async addProducts(data) {
        for (const product of data) {
            await this.addProduct(product);
        }
    }


    async addProduct(product) {
        console.log("Attempting to add...");

        // Validar y agregar producto
        if (this.validateProduct(product)) {
            // Puedes enviar directamente el objeto del producto a la matriz
            this.productArray.push(product);

            await this.writeProductsToFile();

            if (product) {
                console.log(`The product ${product.title} has been added successfully`);
                return { success: true };
            }

        } else {
            console.log(`The product "${product.title}" (with code ${product.code}) and ID ${product.id} already exists`);
            return { success: false };
        }
    }

    async readProductsFromFile() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            // Maneja el error de lectura del archivo o el archivo vacío
            console.error('Error reading products file:', error.message);
            return null;
        }
    }

    async writeProductsToFile() {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.productArray, null, 2), { encoding: 'utf-8' });
        } catch (error) {
            console.error('Error writing products file:', error.message);
        }
    }

    async getProducts(limit) {
        try {
            const products = await this.readProductsFromFile() || [];

            if (limit) {
                // Si se proporciona un límite, devuelve solo la cantidad especificada de productos
                return products.slice(0, limit);
            } else {
                // Si no se proporciona ningún límite, devuelve todos los productos
                return products;
            }
        } catch (error) {
            console.error("Error getting products: ", error.message);
            return null;
        }
    }

    async updateProduct(id, data) {
        let productIndex = this.productArray.findIndex(prod => prod.id === id);

        if (productIndex !== -1) {
            //Actualiza el producto encontrado con los nuevos datos
            this.productArray[productIndex] = { ...this.productArray[productIndex], ...data, id };
            await this.writeProductsToFile(); //Actualiza el archivo después de modificar la matriz
            console.log("Product updated successfully")
            return { success: true };
        } else {
            console.error("Product not found");
            return { success: false };
        }
    }

    async deleteProductByID(id) {
        const productIndex = this.productArray.findIndex(prod => prod.id === id);

        if (productIndex !== -1) {
            // Elimina el producto de la matriz.
            this.productArray.splice(productIndex, 1);
            await this.writeProductsToFile(); //Actualiza el archivo después de modificar la matriz
            console.log(`Product with ID ${id} deleted successfully.`);

            return { success: true };
        } else {
            console.log("Product not found.");
            return { success: false };
        }
    }

    async getProductByID(id) {
        try {
            const products = await this.readProductsFromFile() || [];
            const foundProduct = products.find(prod => prod.id === id);

            if (foundProduct) {
                console.log(`The product with ID ${id} is present object :(${foundProduct}), name: ${foundProduct.title}`);
                return foundProduct;
            } else {
                console.log("Product not found");
                return null;
            }
        } catch (error) {
            console.error('Error reading products file:', error.message);
            return null;
        }
    }
}

const instance = new ProductManager('./products.json');

module.exports = { instance, ProductManager };
/*
// Devuelve una matriz vacía si products.json está vacío
instance.getProducts();

//Agrega un producto
//instance.addProduct({ title: "first item", description: "Product 5", price: 1000, thumbail: "null", code: "NÑO", id: "", stock: "" })

//Devuelve una matriz con el producto agregado
instance.getProducts();

LOS IDS SERAN GENERADOS AUTOMATICAMENTE PARA CADA PRODUCTO LA PRIMERA VEZ QUE SE CORRA EL CODIGO, REVISAR EL ARCHIVO products.json Y REEMPLAZAR SEGUN CORRESPONDA


Actualiza un producto que exista en el archivo products.json por ID con un nuevo objeto (conservando el ID) 
instance.updateProduct("420906297FE196CB968C67471A43023B", { title: "Updated item", description: "update", price: 10000, thumbail: "null", code: "AABB", stock: "" })
Reemplazar el id con cualquier ID generado en los productos dentro del archivo products.json
instance.getProductByID("0D98CC05FDCB7252B4505B8BEB7B5AAD")

*/

//Fin de codigo
