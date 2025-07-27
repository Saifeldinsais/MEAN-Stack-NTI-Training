const{readFile} = require("fs").promises;
const path = require("path");

const productsPath = path.join(__dirname, "../data/products.json");

async function readProducts() {
    try {
        const data = await readFile(productsPath, "utf-8");
        const products = JSON.parse(data);
        return products;
    } catch (error) {
        console.error("Error reading products:", error);
    }
}
module.exports = readProducts;