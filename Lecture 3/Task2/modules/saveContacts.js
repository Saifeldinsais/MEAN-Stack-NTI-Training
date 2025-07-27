const {writeFile} = require('fs').promises;
const path = require('path');

const contactsPath = path.join(__dirname, '../data/contacts.json');

async function saveContacts(contacts) {
    try {
        const data = JSON.stringify(contacts, null, 2);
        await writeFile(contactsPath, data, 'utf-8');
        console.log('Contacts saved successfully.');
    } catch (error) {
        console.error('Error saving contacts:', error);
    }
}

module.exports = saveContacts;