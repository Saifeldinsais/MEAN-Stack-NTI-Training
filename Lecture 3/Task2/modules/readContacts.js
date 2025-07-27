const{readFile} = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "../data/contacts.json");

async function readContacts() {
    try {
        const data = await readFile(contactsPath, "utf-8");
        const contacts = JSON.parse(data);
        return contacts;
    } catch (error) {
        console.error("Error reading contacts:", error);
    }
}

module.exports = readContacts;