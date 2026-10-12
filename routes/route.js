const express = require('express');
const userController = require('../controller/userController');
const productController = require('../controller/productController');
const multerConfig = require('../middleware/multerMiddleware');

const jwtMiddleware = require('../middleware/jwtMiddleware');

const route = express.Router();

route.post('/api/register', userController.register);
route.post('/api/login', userController.login);
route.post('/api/addcategory', jwtMiddleware, productController.addcategory);
route.get('/api/getcategory', jwtMiddleware, productController.getCategory);
route.post('/api/addsubcategory', jwtMiddleware, productController.addsubcategory);
route.get('/api/getsubcategory', jwtMiddleware, productController.getSubCategory);
route.post('/api/addproduct', jwtMiddleware, multerConfig.array('images', 3), productController.addproduct);
route.get('/api/getproduct', jwtMiddleware, productController.getproduct);
route.get('/api/viewproduct/:id', productController.viewproduct);
route.put('/api/updateproduct/:id', multerConfig.single('image'), productController.updateproduct);
route.post('/api/addwishlist', jwtMiddleware, productController.addwishlist);
route.get('/api/getwishlist', productController.getWishlist);
route.delete('/api/deletewishlistproduct', productController.deleteWishlistProduct);
route.get('/api/filtersubcat', productController.filtersubcategory);

module.exports = route