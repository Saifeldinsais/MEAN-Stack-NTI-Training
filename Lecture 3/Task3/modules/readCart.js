const { readFile } = require("fs").promises;
const path = require("path");

const cartPath = path.join(__dirname, "../data/cart.json");

async function readCart() {
    try {
        const data = await readFile(cartPath, 'utf-8');
        const cart = JSON.parse(data);
        if (!cart.items || !Array.isArray(cart.items)) {
            cart.items = [];
        }
        return cart;
    } catch (error) {
        return { items: [] };
    }
}

module.exports = readCart;