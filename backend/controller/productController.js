const multer = require('multer');
const path = require('path');
const fs = require('fs');
const productModel = require('../models/productModel');
const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')

// Ensure the upload directory exists
const uploadDir = './upload/images';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Storage Engine
const storage = multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    },
});

const upload = multer({ storage: storage });

// Add a new product (with image upload)
const addProduct = async (req, res) => {
    try {
        const products = await productModel.find({});
        let id;
        if (products.length > 0) {
            const lastProduct = products[products.length - 1];
            id = lastProduct.id + 1;
        } else {
            id = 1;
        }

        // Check if the image is uploaded
        const imageUrl = req.file
            ? `http://localhost:${process.env.PORT || 5000}/upload/images/${req.file.filename}`
            : req.body.image; // Fallback if no file is uploaded

        const product = new productModel({
            id: id,
            name: req.body.name,
            image: imageUrl,
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price,
        });

        await product.save();
        console.log("Product saved:", product);

        res.json({
            success: true,
            product: product,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
    try {
        await productModel.findOneAndDelete({ id: req.body.id });
        console.log("Product removed");

        res.json({
            success: true,
            message: `Product with ID ${req.body.id} has been removed`,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Fetch all products
const allProduct = async (req, res) => {
    try {
        const products = await productModel.find({});
        console.log("All products fetched");
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


//Creating the endpoint for newcollection data
const newCollection= async(req,res)=>{
    try{
        let products = await productModel.find({});
        let newcollection= products.slice(1).slice(-8);
        console.log("NewCollection Fetched");
        res.send(newcollection);
    }catch(error){
        res.status(500).json({error:"error occured for the new collection data"})
    }
}

//for the popular in women section
const popularInWomen= async(req,res)=>{
    try{
        let products = await productModel.find({category:"women"});
        let popular_in_women = products.slice(0,4);
        console.log("Popular in women fetched");
        res.send(popular_in_women);
    }catch(error){
        res.status(500).json({error:"popular in women occured"})
    }
}
//creating middleware to fetch user
const fetchUser = async(req,res,next)=>{
    const token = req.header('auth-token');
    if(!token){
      return  res.status(401).send({errors:"Please authenticate using valid token"})
    }
    else{
        try{
            const data = jwt.verify(token,'secret_ecom');
            req.user=data.user;
            next();
        }catch(error){
            res.status(401).send({errors:"please authenticate using avalid token"})
        }
    }
}
//for adding products in cartdata
const addToCart= async(req,res)=>{
    try{
        console.log("added",req.body.itemId);
        let userData = await userModel.findOne({_id:req.user.id})
        userData.cartData[req.body.itemId]+=1;
        await userModel.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
        res.send("Added")
       console.log(req.body);
       console.log(req.user);
       console.log("cartItem");
    }catch(error){
        res.status(500).json({error:"error occured "})
    }
}

//creating endpoint to remove product from cartdata
const removeFromCart = async(req, res)=>{
    console.log("removed",req.body.itemId);
    let userData = await userModel.findOne({_id:req.user.id})
    if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId]-=1;
    await userModel.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Removed")
}

//endpoint to get cartdata
const getCartData=async(req,res)=>{
    console.log("getcart")
    let userData = await userModel.findOne({_id:req.user.id});
    res.json(userData.cartData);
}

module.exports = {
    addProduct: [upload.single('image'), addProduct], // Middleware for image upload
    deleteProduct,
    allProduct,
    upload,
    newCollection,
    popularInWomen,
    addToCart,
    fetchUser,
    removeFromCart,
    getCartData
    // Export the upload middleware for reuse if needed
};
