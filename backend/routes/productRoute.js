const {addProduct,deleteProduct,allProduct,newCollection,popularInWomen,addToCart,fetchUser,removeFromCart,getCartData} = require('../controller/productController')
const express = require("express");
const router = express.Router();
router.post('/addproduct',addProduct);// creating API for adding product
router.post('/deleteProduct',deleteProduct);// creating API for deleting the product
router.get('/allProduct',allProduct);//creating API for getting all product
router.get('/newcollection',newCollection);//Creating endpoint for newcollection data
router.get('/popularinwomen',popularInWomen)//creating end point for popular in women
router.post('/addtocart',fetchUser,addToCart)//creating endpoint for adding product in cartdata
router.post('/removefromcart',fetchUser,removeFromCart)//creating endpoint for removing the product
router.post('/getcart',fetchUser,getCartData)//creating the endpoint to get cartdata
module.exports = router