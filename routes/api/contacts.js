const express = require("express");
const router = express();
const contactController = require("../../controllers/contactController");

router
  .route("/")
  .get(contactController.getAllContacts)
  .post(contactController.createNewContact)
  .put(contactController.updateContact)
  .delete(contactController.deleteContact);

router.route("/:id").get(contactController.getContact);

module.exports = router;