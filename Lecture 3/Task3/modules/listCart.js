const readCart = require('./readCart');
const readProducts = require('./readProducts');
const saveCart = require('./saveCart');

async function listCart() {
    const cart = await readCart();
    if (!cart || !Array.isArray(cart.items) || cart.items.length === 0) {
        console.log('Your cart is empty.');
        return;
    } else {
        try {
            const products = await readProducts();
            console.log('Your cart contains:');
            cart.items.forEach(item => {
                const product = products.find(p => p.name === item.name);
                if (product) {
                    console.log(`- ${item.name} (Quantity: ${item.quantity}, Price: $${product.price})`);
                } else {
                    console.log(`- ${item.name} (Quantity: ${item.quantity}, Price: Not available)`);
                }
            });
        } catch (error) {
            console.error('Error listing cart:', error);
        }
    }
}

module.exports = listCart;