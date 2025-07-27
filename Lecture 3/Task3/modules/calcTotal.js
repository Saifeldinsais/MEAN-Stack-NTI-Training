const readCart = require('./readCart');
const readProducts = require('./readProducts');
const saveCart = require('./saveCart');

async function calcTotal(name, quantity) {
    const cart = await readCart();
    if (!cart || !Array.isArray(cart.items) || cart.items.length === 0) {
        console.log('Price = 0.00');
        return;
    } else {
        try {
            const products = await readProducts();
            let total = 0;
            cart.items.forEach(item => {
                const product = products.find(p => p.name === item.name);
                if (product) {
                    total += product.price * item.quantity;
                }
            });
            console.log(`Price = ${total.toFixed(2)}`);
        } catch (error) {
            console.error('Error calculating total:', error);
        }
    }
}

module.exports = calcTotal;