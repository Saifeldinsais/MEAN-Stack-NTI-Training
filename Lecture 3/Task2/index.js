const readContacts = require('./modules/readContacts');
const saveContacts = require('./modules/saveContacts');
const addContact = require('./modules/addContacts');
const removeContacts = require('./modules/removeContacts');
const searchContacts = require('./modules/searchContacts');
const listContacts = require('./modules/listContacts');

async function main() {

    await listContacts();
    await addContact('ali', '1234567890');
    await listContacts();
    await searchContacts('saif tamer');
    await removeContacts('saif tamer');
    await listContacts();
    await searchContacts('ali');
}

main();