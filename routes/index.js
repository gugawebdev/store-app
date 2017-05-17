const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');

// Do work here
router.get('/', storeController.HomePage);

// Route that render the store-add page
router.get('/add', storeController.AddStore);

// Method used to add the new store to our database
router.post('/add', storeController.createStore);


// List all stores saved in the database
router.get('/stores', storeController.getStores);


//Route to edit data of an especific store
router.get('/stores/:storeId/edit', storeController.editStore);

router.post('/add/:storeId', storeController.updateStore);

module.exports = router;
