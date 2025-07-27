const readContacts = require('./readContacts');
const saveContacts = require('./saveContacts');

async function removeContacts(name){
    if(!name){
        console.log("Name is required to remove contact.")
    }else{
        const contacts = await readContacts();
        const contactIndex = contacts.findIndex(contact => contact.name === name);
        if(contactIndex === -1) {
            console.log(`Contact with name "${name}" not found.`);
            return;
        }
        contacts.splice(contactIndex, 1);
        try {
            await saveContacts(contacts);
            console.log(`Contact with name "${name}" removed successfully.`);
        } catch (error) {
            console.log("Error removing contact:", error);
            return;
        }
    }
}
module.exports = removeContacts;