const addToCart = require('./modules/addToCart');
const readProducts = require('./modules/readProducts');
const listCart = require('./modules/listCart');
const readCart = require('./modules/readCart');
const removeFromCart = require('./modules/removeFromCart');
const saveCart = require('./modules/saveCart');
const calcTotal = require('./modules/calcTotal');

async function main() {
    await addToCart('Tshirt', 2);
    await listCart();
    await calcTotal();
    await removeFromCart('shoes', 1);
    await listCart();
    await calcTotal();
}

main();