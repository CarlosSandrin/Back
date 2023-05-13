import { existsSync, readFileSync, writeFileSync } from "fs";
import express from "express";
import morgan from "morgan";

class ProductManager {
  #products = [];
  #path;

  constructor(path) {
    this.#path = path;
    if (existsSync(this.#path)) {
      const file = readFileSync(this.#path, "utf-8");
      const json = JSON.parse(file);

      this.#products = data;
    } else {
      const data = JSON.stringify([]);
      writeFileSync(this.#path, data, () => {
        this.#products = [];
      });
    }
  }

  #saveData = () => {
    const data = JSON.stringify(this.#products);
    writeFileSync(this.#path, data, (err) => {
      if (err) throw new Error(err);
      return "success";
    });
  };

  addProduct = (product) => {
    if (!product.title) throw new Error("Falta el campo 'Title'!");
    if (!product.description) throw new Error("Falta el campo 'Descripcion'!");
    if (!product.thumbnail) throw new Error("Falta el campo 'thumbnail'!");
    if (!product.stock) throw new Error("Falta el campo 'stock'!");
    if (!product.code) throw new Error("Falta el campo 'code'!");

    let code = false;
    for (let i = 0; i < this.#product.length; i++) {
      if (this.#products[i].code === product.code) {
        code = true;
      }
    }
    if (code)
      throw new Error("Ya existe el producto con este codigo!" + product.code);

    this.#products.push(product);
    return this.#saveData();
  };

  updateProduct = (code, product) => {
    let products = this.#products;
    for (let i = 0; i < products.length; i++) {
      if (products[i].code === code) {
        products[i] = {
          ...products[i],
          ...update,
        };
      }
    }
    this.#products = products;
    return this.#saveData();
  };

  deleteProduct = (code) => {
    let products = this.#products;
    let index = null;
    for (let i = 0; i < products.length; i++) {
      if (products[i].code === code) {
        index = i;
      }
    }

    if (index || index === 0) {
      products = products.slice(index, 1);
    } else {
      throw new Error("El producto con el codigo no existe" + code);
    }

    this.#products = products;
    return this.#saveData();
  };

  getProducts() {
    return this.#products;
  }

  getProductById(id) {
    const product = this.#products.find((product) => product.id === id);
    if (!product) {
      throw new Error("No se encontró el producto con el ID" + id);
    }
    return product;
  }
}

const product = {
  title: "Play Station 4",
  description: "Version Black Slim",
  thumbnail: "image",
  stock: 8,
  price: 120000,
  code: "abc123",
};

const product2 = {
  title: "Play Station 4",
  description: "Version white Slim",
  thumbnail: "image",
  stock: 4,
  price: 120000,
  code: "abc124",
};

const pm = ProductManager("products.json");

try {
  pm.addProduct(product);
  pm.addProduct(product2);
} catch (err) {
  console.log(err);
}

export default ProductManager;

//   getProducts() {
//     return this.#products;
//   }

//     const newProduct = {
//       title,
//       description,
//       price,
//       thumbnail,
//       code,
//       stock,
//       id: this.nuevaId(),
//     };

//     this.products.push(newProduct);
//     return newProduct;
//   }

//   getProductById(id) {
//     const product = this.products.find((product) => product.id === id);
//     if (!product) {
//       throw new Error("No se encontró el producto");
//     }
//     return product;
//   }

//   nuevaId() {
//     const ids = this.products.map((product) => product.id);
//     let newId = ids.length ? Math.max(...ids) + 1 : 1;
//     return `NuevaId${newId}`;
//   }
// }

// // Prueba de la clase ProductManager
// const manager = new ProductManager();
// console.log(manager.getProducts()); // []

// const product1 = {
//   title: "producto prueba",
//   description: "Este es un producto prueba",
//   price: 200,
//   thumbnail: "Sin imagen",
//   code: "abc123",
//   stock: 25,
// };

// const newProduct1 = manager.addProduct(product1);
// console.log(newProduct1);

// console.log(manager.getProducts());

// const product2 = {
//   title: "producto repetido",
//   description: "Este es un producto repetido",
//   price: 300,
//   thumbnail: "Sin imagen",
//   code: "abc123",
//   stock: 30,
// };

// try {
//   manager.addProduct(product2);
// } catch (error) {
//   console.error(error.message); // ERROR porque el producto ya existe :-P
// }

// const productById = manager.getProductById("NuevaId1");
// console.log(productById);

// try {
//   manager.getProductById("NoExiste");
// } catch (error) {
//   console.error(error.message); // ERROR poruqenNo se encontró el producto
// }
