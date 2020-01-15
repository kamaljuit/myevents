const router = require("express").Router();
const { getAllUsers } = require("../User/UserController");
const authController = require("../Authentication/AuthController");
router.route("/").get(authController.protect, getAllUsers);

router.route("/login").post(authController.login);
router.route("/signup").post(authController.signUp);
router.route("/logout").get(authController.logout);

// router.route('/auth/activate/:token').get(authController.activate);
module.exports = router;
