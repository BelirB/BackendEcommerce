class ProductManager {
    constructor() {
        this.products = [];
    }

    static id = 0

    addProduct(tittle, descrption, price, image, code, stock) {
        for(let i = 0; i < this.products.length;i++) {
            if(this.products[i].code === code) {
                console.log(`El codigo ${code} esta repetido`)
                break;
            }
        }

        const newProduct ={
            tittle,
            descrption,
            price,
            image,
            code,
            stock,
        }

        if(!Object.values(newProduct).includes(undefined)) {
        ProductManager.id++;
        this.products.push({
            ...newProduct,
            id: ProductManager.id, 
        });
        }else{
            console.log("Todos los campos son requeridos")
        }  


    }
    
    getProduct() {
        return this.products;
    }

    existe(id) {
        return this.products.find((producto) => producto.id === id)
    }

    getProductById(id) {
      !this.existe(id) ? console.log("Not Found") : console.log(this.existe(id));
        
    }
}

 const productos = new ProductManager

 console.log(productos.getProduct());

 productos.addProduct("producto prueba", "Este es un producto prueba", 200, "sin imagen", "abc123", 25);
 productos.addProduct("producto prueba2", "Este es un producto prueba2", 201, "sin imagenx", "abc1234", );

console.log(productos.getProduct());

//Validacion de CodeRepeat
 productos.addProduct("producto prueba3", "Este es un producto prueba3", 201, "sin imagenx2", "abc1234", 25);

 productos.getProductById(2);

 //ID no encontrado
 productos.getProductById(3);

 //Final de codigo












