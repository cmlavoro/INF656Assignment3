const express = require("express");
const router = express();
const contactController = require("../../controllers/contactController");
const validate = require("../../middleware/formValidation.js");

router
  .route("/")
  .get(contactController.getAllContacts)
  .post((req, res, next) => {
    const validationResult = validate.FormValid(req.body);
    if (validationResult != true) {
      res.redirect(validationResult);
    } else {
      next();
    }
  }, contactController.createNewContact)
  .put((req, res, next) => {
    const validationResult = validate.FormValid(req.body);
    if (validationResult != true) {
      res.redirect(validationResult);
    } else {
      next();
    }
  }, contactController.updateContact)
  .delete(contactController.deleteContact);

router.route("/:id").get(contactController.getContact);

module.exports = router;