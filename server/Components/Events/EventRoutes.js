const router = require("express").Router();
const eventController = require("./EventController");
const authController = require("../Authentication/AuthController");
router
  .route("/")
  .get(authController.protect, eventController.getEvent)
  .post(authController.protect, eventController.addEvent)
  .delete(authController.protect, eventController.removeEvent);

module.exports = router;
