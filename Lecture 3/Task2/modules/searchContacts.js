const readContacts = require('./readContacts');
const saveContacts = require('./saveContacts');

async function searchContacts(name) {
    if(!name){
        console.log("Name is required to search for a contact.");
        return;
    }

    const contacts = await readContacts();
    const contact = contacts.find((contact) => contact.name === name);

    if(!contact){
        console.log(`Contact with name "${name}" not found.`);
    }else{
        console.log(`Contact found: ID: ${contact.id}, Name: ${contact.name}, Number: ${contact.number}`);
    }
}

module.exports = searchContacts;