const { writeFile } = require("fs").promises;
const path = require("path");

const cartPath = path.join(__dirname, "../data/cart.json");

async function saveCart(cart) {
    
    await writeFile(cartPath, JSON.stringify({ items: cart.items || [] }, null, 2));
}

module.exports = saveCart;