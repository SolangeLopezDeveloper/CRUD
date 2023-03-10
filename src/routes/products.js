// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
// ************ Controller Require ************
const productsController = require('../controllers/productsController');



const {uploadProductImages} = require('../middlewares/upload')


/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.products); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create); 


router.post('/create', uploadProductImages.single('images'), productsController.store)



/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); 
router.put('/edit/:id', productsController.update); 


/*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', productsController.destroy); 



module.exports = router;
