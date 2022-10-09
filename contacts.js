const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const parsedData = JSON.parse(data);
    console.log(parsedData);
    return parsedData;
  } catch (err) {
    console.error(err);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const parsedData = JSON.parse(data);
    const contactData = parsedData.find((item) => item.id === contactId);
    console.log(contactData);
  } catch (err) {
    console.error(err);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const parsedData = JSON.parse(data);
    const newData = JSON.stringify(
      parsedData.filter((item) => item.id !== contactId)
    );
    fs.writeFile(contactsPath, newData);
    console.log(`Contact with id ${contactId} deleted succesfull!`);
  } catch (err) {
    console.error(err);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath);
    const parsedData = JSON.parse(data);
    const newId = (Number(parsedData[parsedData.length - 1].id) + 1).toString();
    const newData = JSON.stringify([
      ...parsedData,
      { id: newId, name, email, phone },
    ]);
    fs.writeFile(contactsPath, newData);
    console.log(`Contact ${name} added succesfull!`);
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
