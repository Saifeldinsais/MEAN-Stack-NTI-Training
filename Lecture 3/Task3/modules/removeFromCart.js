const readCart = require('./readCart');
const readProducts = require('./readProducts');
const saveCart = require('./saveCart');

async function removeFromCart(name, quantity) {
    if (!name || !quantity) {
        console.error('Name and quantity are required to remove from cart.');
        return;
    }

    try {
        const cart = await readCart();

        if (!cart.items || !Array.isArray(cart.items)) {
            cart.items = [];
        }

        const product = cart.items.find(item => item.name === name);
        
        if (!product) {
            console.error('Product not found in cart:', name);
            return;
        }

        if (product.quantity < quantity) {
            console.error('Not enough quantity in cart to remove:', product.quantity);
            return;
        }

        product.quantity -= quantity;

        if (product.quantity === 0) {
            cart.items = cart.items.filter(item => item.name !== name);
        }

        await saveCart(cart);
        console.log('Product removed from cart successfully:', { name, quantity });
    } catch (error) {
        console.error('Error removing from cart:', error);
    }
}
module.exports = removeFromCart;