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
        this.addProducts(initialProducts);
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

    addProducts(data) {
        data.forEach(product => {
            this.addProduct(product);
        });
    }

    addProduct(product) {
        // Validar y agregar producto
        if (this.validateProduct(product)) {
            this.productArray.push(product);
            this.writeProductsToFile();
        } else {
            console.log(`The product "${product.title}" (with code ${product.code}) and ID ${product.id} already exists`);
        }
    }

    readProductsFromFile() {
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            // Maneja el error de lectura del archivo o el archivo vacío
            console.error('Error reading products file:', error.message);
            return null;
        }
    }

    writeProductsToFile() {
        try {
            fs.writeFileSync(this.path, JSON.stringify(this.productArray, null, 2), 'utf-8');
        } catch (error) {
            console.error('Error writing products file:', error.message);
        }
    }

    getProducts() {
        const products = this.readProductsFromFile() || [];
        console.log(products);
    }

    updateProduct(id, data) {
        let productIndex = this.productArray.findIndex(prod => prod.id === id);

        if (productIndex !== -1) {
            //Actualiza el producto encontrado con los nuevos datos
            this.productArray[productIndex] = { ...this.productArray[productIndex], ...data, id };
            this.writeProductsToFile(); //Actualiza el archivo después de modificar la matriz
        } else {
            console.log("Product not found");
        }
    }

    deleteProductByID(id) {
        const productIndex = this.productArray.findIndex(prod => prod.id === id);

        if (productIndex !== -1) {
            // Elimina el producto de la matriz
            this.productArray.splice(productIndex, 1);
            this.writeProductsToFile(); //Actualiza el archivo después de modificar la matriz
            console.log(`Product with ID ${id} deleted successfully.`);
        } else {
            console.log("Product not found.");
        }
    }

    getProductByID(id) {
        try {
            const products = this.readProductsFromFile() || [];
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

const productManager = new ProductManager('./products.json');

// Devuelve una matriz vacía si products.json está vacío
productManager.getProducts();

//Agrega un producto
//productManager.addProduct({ title: "first item", description: "Product 5", price: 1000, thumbail: "null", code: "NÑO", id: "", stock: "" })

//Devuelve una matriz con el producto agregado
productManager.getProducts();

// LOS IDS SERAN GENERADOS AUTOMATICAMENTE PARA CADA PRODUCTO LA PRIMERA VEZ QUE SE CORRA EL CODIGO, REVISAR EL ARCHIVO products.json Y REEMPLAZAR SEGUN CORRESPONDA

// Actualiza un producto que exista en el archivo products.json por ID con un nuevo objeto (conservando el ID) 
productManager.updateProduct("420906297FE196CB968C67471A43023B", { title: "Updated item", description: "update", price: 10000, thumbail: "null", code: "AABB", stock: "" })
// Reemplazar el id con cualquier ID generado en los productos dentro del archivo products.json
productManager.getProductByID("0D98CC05FDCB7252B4505B8BEB7B5AAD")

// Fin de codigo











