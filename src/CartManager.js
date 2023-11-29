const fs = require('fs');
const crypto = require('crypto');
const productManager = require("./ProductManager")

class Cart {
    constructor(id) {
        this.id = id;
        this.products = [];
    }

    async validateProduct(productID) {
        // Comprueba si el ID del producto existe en el JSON del producto del administrador del producto
        const itemExistsOnDatabase = await productManager.instance.getProductByID(productID);

        //Asegúrate de verificar si el elemento existe antes de intentar acceder a sus propiedades
        if (itemExistsOnDatabase && itemExistsOnDatabase.id === productID) {
            return true;
        }
        return false;
    }
    async addProduct(productID) {

        const status = await this.validateProduct(productID);
        console.log(status);

        if (status) {
            const existingProduct = this.products.find(entry => entry.id === productID);

            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                this.products.push({ product: productID, quantity: 1 });
            }
        }
    }
}

class CartManager {
    constructor(path) {
        console.log("Cart manager initialized");

        this.path = path;
        this.cartArray = [];

        // Lee los carritos iniciales del archivo o crea una matriz vacía
        this.initialize();
    }

    async initialize() {
        // Lee los carritos iniciales del archivo o crea una matriz vacía
        const data = await this.readCartsFromFile();
        this.cartArray = data || [];
    }

    //Función hash para generar una identificación de carrito
    generateID() {
        const idData = `${Math.random()}`;
        const hash = crypto.createHash('md5').update(idData).digest('hex');
        return hash.toUpperCase();
    }

    //Valida si se puede crear un carrito o no
    async validateCart(id) {
        const isIDDuplicate = this.cartArray.some(cart => cart.id === id);

        if (isIDDuplicate) {
            return false;
        }

        return true;
    }

     //Lee de forma asincrónica desde un archivo json
    async readCartsFromFile() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            // Maneja el error de lectura del archivo o el archivo vacío
            console.error('Error reading cart file:', error.message);
            return null;
        }
    }

    //Escribe de forma asincrónica en un archivo json
    async writeCartsToFile() {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.cartArray, null, 2), { encoding: 'utf-8' });
        } catch (error) {
            console.error('Error writing cart file:', error.message);
        }
    }

    //Devuelve al carrito por su id.
    async getCart(id) {
        const cart = this.cartArray.find(cart => cart.id === id);
        return cart || null;
    }

    //Agregar o actualizar un elemento en el carrito
    async addToCart(cartID, productID) {
        const cart = await this.getCart(cartID);

        if (cart) {
            const existingProduct = cart.products.find(entry => entry.product === productID);
            //Comprueba si productos.json contiene el producto deseado buscando su identificación.
            const itemExistsOnDatabase = await productManager.instance.getProductByID(productID);

            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                if (itemExistsOnDatabase) {
                    cart.products.push({ product: productID, quantity: 1 });
                }
            }

            await this.writeCartsToFile();
            return cart || null;
        }
    }

    //Crea un carrito y le envía algunos productos.
    async createCart(products) {
        const cartID = this.generateID();

        // Si el ID del carrito es válido, crea el carrito con los productos especificados
        if (await this.validateCart(cartID)) {
            const newCart = new Cart(cartID);
            await Promise.all(products.map(productID => newCart.addProduct(productID)));
            this.cartArray.push(newCart);
            await this.writeCartsToFile();
            console.log(`Cart created succesfully with id ${cartID}`)
            return newCart;
        }

        return null;
    }
}

const instance = new CartManager('./cart.json');

module.exports = { instance, CartManager };