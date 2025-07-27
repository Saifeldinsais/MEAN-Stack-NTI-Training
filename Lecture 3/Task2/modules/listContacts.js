const readContacts = require("./readContacts");
const saveContacts = require("./saveContacts");

async function listContacts(){
    const contacts = await readContacts();
    console.log("Contacts List:");
    contacts.forEach(contact =>{
        console.log(`ID: ${contact.id}, Name: ${contact.name}, Number: ${contact.number}`);
    });
}
module.exports = listContacts;