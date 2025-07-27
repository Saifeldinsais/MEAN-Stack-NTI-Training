const readProducts = require('./readProducts');
const readCart = require('./readCart');
const saveCart = require('./saveCart');

async function addToCart(name, quantity) {
    if (!name || !quantity) {
        console.error('Name and quantity are required to add to cart.');
        return;
    }

    try {
        const products = await readProducts();
        const cart = await readCart();
        if (!cart.items || !Array.isArray(cart.items)) {
            cart.items = [];
        }

        const product = products.find(p => p.name === name);
        if (!product) {
            console.error('Product not found:', name);
            return;
        }

        const existingItem = cart.items.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ name, quantity });
        }

        await saveCart(cart);
        console.log('Product added to cart successfully:', { name, quantity });
    } catch (error) {
        console.error('Error adding to cart:', error);
    }
}

module.exports = addToCart;