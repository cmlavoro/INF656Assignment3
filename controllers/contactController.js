
const {writeFile} = require("fs");

const data = {
  contacts: require("../model/contacts.json"),
  setContacts(data) {
    this.contacts = data;

    var jsonArray = [];
        for (i in data) {
            jsonArray.push(data[i]);
        }
        writeFile("model/contacts.json", JSON.stringify(jsonArray), "utf-8", function(err){
          if (err) throw err;
          console.log('Data Saved!');
        });
  }
};

//Get all Contacts
const getAllContacts = (req, res) => {
  res.json(data.contacts);
};

//Create a Contact
const createNewContact = (req, res) => {
  const newId = data.contacts?.length
    ? data.contacts[data.contacts.length - 1].id + 1
    : 1;
  const newContact = {
    id: newId,
    Name: req.body.Name,
    Phone: req.body.Phone,
    Email: req.body.Email,
    Address: req.body.Address
  };

  if (!newContact.Name || !newContact.Phone|| !newContact.Email) {
    return res
      .status(400)
      .json({ message: "Name, Phone, and Email are required" });
  }

  data.setContacts([...data.contacts, newContact]);
  res.status(201).json(data.contacts);
};

//Update a Contact
const updateContact = (req, res) => {
  const contact = data.contacts.find(c => c.id === parseInt(req.body.id));
  if (!contact) {
    return res
      .status(400)
      .json({ message: `Contact ${req.body.id} is not found` });
  }
  if (req.body.Name) contact.Name = req.body.Name;
  if (req.body.Phone) contact.Phone = req.body.Phone;
  if (req.body.Email) contact.Email = req.body.Email;
  if (req.body.Address) contact.Address = req.body.Address;

  const filteredArray = data.contacts.filter(c => c.id !== parseInt(req.body.id));
  const unsortedArray = [...filteredArray, contact];

  data.setContacts(
    unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
  );
  res.json(data.contacts);
};

//Delete a Contact
const deleteContact = (req, res) => {
  const contact = data.contacts.find(c => c.id === parseInt(req.body.id));
  if (!contact) {
    return res
      .status(400)
      .json({ message: `Contact ${req.body.id} is not found` });
  }
  const filteredArray = data.contacts.filter(c => c.id !== parseInt(req.body.id));
  data.setContacts([...filteredArray]);
  res.json(data.contacts);
};

//Get a Contact
const getContact = (req, res) => {
  const contact = data.contacts.find(c => c.id === parseInt(req.params.id));
  if (!contact) {
    return res
      .status(400)
      .json({ message: `Contact with ID of ${req.params.id} is not found` });
  }
  res.json(contact);
};

module.exports = {
  getAllContacts,
  createNewContact,
  updateContact,
  deleteContact,
  getContact,
};