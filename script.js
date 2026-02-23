// Authentication Module
const auth = {
  users: [],
  
  register(username, password) {
    const user = { username, password };
    this.users.push(user);
    console.log(`${username} registered successfully.`);
  },
  
  login(username, password) {
    const user = this.users.find(user => user.username === username && user.password === password);
    return user ? true : false;
  }
};

// Product Management Module
const productManager = {
  products: [],
  
  addProduct(name, price) {
    const product = { id: this.products.length + 1, name, price };
    this.products.push(product);
    console.log(`Product ${name} added successfully.`);
  },
  
  editProduct(id, name, price) {
    const product = this.products.find(prod => prod.id === id);
    if (product) {
      product.name = name;
      product.price = price;
      console.log(`Product ${id} updated successfully.`);
    } else {
      console.log(`Product not found.`);
    }
  },
  
  deleteProduct(id) {
    this.products = this.products.filter(prod => prod.id !== id);
    console.log(`Product ${id} deleted successfully.`);
  }
};

// Shopping Cart Module
const shoppingCart = {
  cart: [],
  
  addToCart(product) {
    this.cart.push(product);
    console.log(`Product ${product.name} added to cart.`);
  },
  
  removeFromCart(productId) {
    this.cart = this.cart.filter(prod => prod.id !== productId);
    console.log(`Product ${productId} removed from cart.`);
  },
  
  checkout() {
    let total = this.cart.reduce((sum, product) => sum + product.price, 0);
    console.log(`Checkout successful! Total amount: $${total}.`);
    this.cart = []; // Empty cart after checkout
  }
};
