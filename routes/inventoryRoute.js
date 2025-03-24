// Needed Resources
const express = require('express');
const router = new express.Router();
const invController = require('../controllers/invController');
const revController = require('../controllers/reviewController');
const utilities = require('../utilities/');
const regValidate = require('../utilities/inventory-validation');
const Util = require('../utilities'); // Import your utilities

// Route to build inventory by classification view
router.get('/type/:classificationId', utilities.handleErrors(async (req, res) => {
  const nav = await Util.getNav(req, res);
  await invController.buildByClassificationId(req, res, nav);
}));

// Route to build details by InventoryID view
router.get('/detail/:inventoryId', utilities.handleErrors(async (req, res) => {
  const nav = await Util.getNav(req, res);
  await invController.buildByInventoryID(req, res, nav);
}));

// Route to build Inventory Management view
router.get('/', utilities.checkAccountType, utilities.handleErrors(async (req, res) => {
  const nav = await Util.getNav(req, res);
  await invController.buildByInvManagement(req, res, nav);
}));

// Route to build Add Classification View
router.get('/add-classification', utilities.handleErrors(async (req, res) => {
  const nav = await Util.getNav(req, res);
  await invController.buildByAddClassification(req, res, nav);
}));

// Route to handle Add Classification
router.post(
  '/add-classification',
  regValidate.classificationRules(),
  regValidate.checkClassificationData,
  utilities.handleErrors(async (req, res) => {
    const nav = await Util.getNav(req, res);
    await invController.addClassification(req, res, nav);
  })
);

// Route to build Add Inventory View
router.get('/add-inventory', utilities.handleErrors(async (req, res) => {
  const nav = await Util.getNav(req, res);
  await invController.buildByAddInventory(req, res, nav);
}));

// Route to handle Add Inventory
router.post(
  '/add-inventory',
  regValidate.inventoryRules(),
  regValidate.checkInventoryData,
  utilities.handleErrors(async (req, res) => {
    const nav = await Util.getNav(req, res);
    await invController.addInventory(req, res, nav);
  })
);

// Route to build Get Inventory View (JSON - likely doesn't render a full page)
router.get(
  '/getInventory/:classification_id',
  utilities.checkAccountType,
  utilities.handleErrors(invController.getInventoryJSON) // This likely returns JSON, no need for nav
);

// Route to build Edit Inventory View
router.get('/edit/:inventoryId', utilities.checkAccountType, utilities.handleErrors(async (req, res) => {
  const nav = await Util.getNav(req, res);
  await invController.buildByEditInventory(req, res, nav);
}));

// Route to handle Edit/Update Inventory
router.post(
  '/update/',
  regValidate.inventoryRules(),
  regValidate.checkInventoryData,
  utilities.handleErrors(async (req, res) => {
    const nav = await Util.getNav(req, res);
    await invController.updateInventory(req, res, nav);
  })
);

// Route to build Delete Inventory View
router.get(
  '/delete/:inventoryId',
  utilities.checkAccountType,
  utilities.handleErrors(async (req, res) => {
    const nav = await Util.getNav(req, res);
    await invController.buildByDeleteInventory(req, res, nav);
  })
);

// Route to handle Delete Inventory
router.post('/delete/', utilities.handleErrors(async (req, res) => {
  const nav = await Util.getNav(req, res);
  await invController.deleteInventory(req, res, nav);
}));

module.exports = router;