
const {writeFile} = require("fs");

const data = {
  contacts: require("../model/contacts.json"),
  setContacts(data) {
    this.contacts = data;

    var jsonArray = [];
    for (i in data) {
      jsonArray.push(data[i]);
    }
    writeFile(
      "model/contacts.json",
      JSON.stringify(jsonArray),
      "utf-8",
      function (err) {
        if (err) throw err;
        console.log("Data Saved!");
      }
    );
  },
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
    Address: req.body.Address,
  };

  if (!newContact.Name || !newContact.Phone || !newContact.Email) {
    return res.redirect("/400");
  }

  var phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if (!newContact.Phone.match(phoneRegex)) {
    return res.redirect("/phoneinvalid");
  }

  var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!newContact.Email.match(emailRegex)) {
    return res.redirect("/emailinvalid");
  } 

  data.setContacts([...data.contacts, newContact]);
  res.redirect("/?s=0");
};

//Update a Contact
const updateContact = (req, res) => {
  const contact = data.contacts.find((c) => c.id === parseInt(req.body.id));
  if (!contact) {
    return res
      .status(400)
      .json({ message: `Contact ${req.body.id} is not found` });
  }

  var somethingHasChanged = false;

  if (req.body.Name && req.body.Name != contact.Name)
  {
    contact.Name = req.body.Name;
    somethingHasChanged = true;
  }

  if (req.body.Phone && req.body.Phone != contact.Phone)
  {
    var phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!req.body.Phone.match(phoneRegex)) {
      return res.redirect("/phoneinvalid");
    }

    contact.Phone = req.body.Phone;
    somethingHasChanged = true;
  }

  if (req.body.Email && req.body.Email != contact.Email)
  {
    var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!req.body.Email.match(emailRegex)) {
      return res.redirect("/emailinvalid");
    } 
    contact.Email = req.body.Email;
    somethingHasChanged = true;
  }

  if (req.body.Address && req.body.Address != contact.Address)
  {
    contact.Address = req.body.Address;
    somethingHasChanged = true;
  }

  const filteredArray = data.contacts.filter(
    (c) => c.id !== parseInt(req.body.id)
  );
  const unsortedArray = [...filteredArray, contact];

  data.setContacts(
    unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
  );

  if(somethingHasChanged)
  {
    res.redirect("/?s=1");
  }
  else
  {
    res.redirect("/");
  }
};

//Delete a Contact
const deleteContact = (req, res) => {
  const contact = data.contacts.find((c) => c.id === parseInt(req.body.id));
  if (!contact) {
    return res
      .status(400)
      .json({ message: `Contact ${req.body.id} is not found` });
  }
  const filteredArray = data.contacts.filter(
    (c) => c.id !== parseInt(req.body.id)
  );
  data.setContacts([...filteredArray]);
  res.redirect("/?s=2");
};

//Get a Contact
const getContact = (req, res) => {
  const contact = data.contacts.find((c) => c.id === parseInt(req.params.id));
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
