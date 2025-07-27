const readContacts = require('./readContacts');
const saveContacts = require('./saveContacts');

async function addContact(name, number) {
    if (!name || !number) {
        console.error('Name and number are required to add a contact.');
        return;
    }else{
        try {
            const contacts = await readContacts();
            let contact = {id: contacts.length + 1, name, number};
            contacts.push(contact);
            await saveContacts(contacts);
            console.log('Contact added successfully:', contact);
        } catch (error) {
            console.error('Error adding contact:', error);
            return;
        }
    }
}

module.exports = addContact;