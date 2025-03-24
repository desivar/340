// Needed Resources
const express = require("express");
const router = new express.Router();
const accountController = require("../controllers/accountController");
const { handleErrors, checkLogin } = require("../utilities");
const regValidate = require('../utilities/account-validation');
const Util = require('../utilities'); // Import your utilities

// Route to build default account view
router.get("/", checkLogin, handleErrors(async (req, res) => {
  const nav = await Util.getNav(req, res);
  await accountController.buildAccount(req, res, nav);
}));

// Route to build account register view
router.get("/register", handleErrors(async (req, res) => {
  const nav = await Util.getNav(req, res);
  await accountController.buildRegister(req, res, nav);
}));

// Process the registration data
router.post(
  "/register",
  regValidate.registationRules(),
  regValidate.checkRegData,
  handleErrors(async (req, res) => {
    const nav = await Util.getNav(req, res);
    await accountController.registerAccount(req, res, nav);
  })
);

// Route to build account login view
router.get("/login", handleErrors(async (req, res) => {
  const nav = await Util.getNav(req, res);
  await accountController.buildLogin(req, res, nav);
}));

// Process the login attempt
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  handleErrors(async (req, res) => {
    const nav = await Util.getNav(req, res);
    await accountController.accountLogin(req, res, nav);
  })
);

// Route to build account edit view
router.get("/edit/:account_id", handleErrors(async (req, res) => {
  const nav = await Util.getNav(req, res);
  await accountController.buildEditAccount(req, res, nav);
}));

// Process the updated account information
router.post(
  "/accountupdate",
  regValidate.updateAccountRules(),
  regValidate.checkEditAccountData,
  handleErrors(async (req, res) => {
    const nav = await Util.getNav(req, res);
    await accountController.editAccountInfo(req, res, nav);
  })
);

// Process the account password change
router.post(
  "/changepassword",
  regValidate.changePasswordRules(),
  regValidate.checkEditAccountData,
  handleErrors(async (req, res) => {
    const nav = await Util.getNav(req, res);
    await accountController.editAccountPassword(req, res, nav);
  })
);

router.get(
  "/logout",
  handleErrors(async (req, res) => {
    const nav = await Util.getNav(req, res);
    await accountController.logoutAccount(req, res, nav);
  })
);

module.exports = router;