const initialProducts = [
    { title: "first item", description: "Product 1", price: 200, thumbail: "null", code: "ABC", id: "", stock: "" },
    { title: "second item", description: "Product 2", price: 400, thumbail: "null", code: "DEF", id: "", stock: "" },
    { title: "third item", description: "Product 3", price: 600, thumbail: "null", code: "HIJ", id: "", stock: "" },
    { title: "forth item", description: "Product 4", price: 800, thumbail: "null", code: "KLM", id: "", stock: "" },
];


const fs = require('fs');
const crypto = require('crypto');

class ProductManager {
    constructor(path) {
        console.log("Product manager initialized");

        this.path = path;

        // Lee los productos iniciales del archivo o crea una matriz vacía
        this.productArray = this.readProductsFromFile() || [];

        // Agrega todos los productos iniciales a la matriz de productos
      //  this.addProducts(initialProducts);
    }

    // Función hash para generar la identificación del producto
    generateID(product) {
        const idData = `${product.title}${product.price}${product.code}${product.description}${Math.random()}`;
        const hash = crypto.createHash('md5').update(idData).digest('hex');
        product.id = hash.toUpperCase();
    }

    validateProduct(product) {
        //Comprueba si el producto con el mismo código o ID ya existe
        this.generateID(product);

        const isCodeDuplicate = this.productArray.some(prod => prod.code === product.code);
        const isIDDuplicate = this.productArray.some(prod => prod.id === product.id);

        return !isCodeDuplicate && !isIDDuplicate;
    }

    async addProducts(data) {
        for (const product of data) {
            await this.addProduct(product);
        }
    }


    async addProduct(product) {
        // Validar y agregar producto
        if (this.validateProduct(product)) {
            this.productArray.push(product);
            await this.writeProductsToFile();
        } else {
            console.log(`The product "${product.title}" (with code ${product.code}) and ID ${product.id} already exists`);
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
            await fs.writeFile(this.path, JSON.stringify(this.productArray, null, 2), 'utf-8');
        } catch (error) {
            console.error('Error writing products file:', error.message);
        }
    }

    async getProducts(limit) {
        try {
            const products = await this.readProductsFromFile() || [];
    
            if (limit) {
                // Si se proporciona un límite, devolver solo la cantidad especificada de productos
                return products.slice(0, limit);
            } else {
                // Si no se proporciona ningún límite, devolver todos los productos
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
        } else {
            console.log("Product not found");
        }
    }

    async deleteProductByID(id) {
        const productIndex = this.productArray.findIndex(prod => prod.id === id);

        if (productIndex !== -1) {
            // Elimina el producto de la matriz
            this.productArray.splice(productIndex, 1);
            await this.writeProductsToFile(); //Actualiza el archivo después de modificar la matriz
            console.log(`Product with ID ${id} deleted successfully.`);
        } else {
            console.log("Product not found.");
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
// Devuelve una matriz vacía si products.json está vacía
instance.getProducts();

//Agrega un producto
//instance.addProduct({ title: "first item", description: "Product 5", price: 1000, thumbail: "null", code: "NÑO", id: "", stock: "" })

//Devuelve una matriz con el producto agregado
instance.getProducts();

//LOS IDS SERAN GENERADOS AUTOMATICAMENTE PARA CADA PRODUCTO LA PRIMERA VEZ QUE SE CORRA EL CODIGO, REVISAR EL ARCHIVO products.json Y REEMPLAZAR SEGUN CORRESPONDA


// actualiza un producto que exista en el archivo products.json por ID con un nuevo objeto (conservando el ID) 
instance.updateProduct("420906297FE196CB968C67471A43023B", { title: "Updated item", description: "update", price: 10000, thumbail: "null", code: "AABB", stock: "" })
//reemplazar el id con cualquier ID generado en los productos dentro del archivo products.json
instance.getProductByID("0D98CC05FDCB7252B4505B8BEB7B5AAD")

*/

//Fin de Codigo
