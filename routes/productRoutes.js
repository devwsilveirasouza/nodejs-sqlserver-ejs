const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Rotas para produtos
router.get('/', productController.getAll);
router.get('/create', productController.createForm);
router.post('/create', productController.create);
router.get('/details/:id', productController.details);
router.get('/edit/:id', productController.editForm);
router.put('/edit/:id', productController.update);
router.delete('/delete/:id', productController.delete);

module.exports = router;