const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')
//for creating the new user
const signUp = async (req, res) => {
    try {
        let check = await userModel.findOne({ email: req.body.email });
        if (check) {
            return res.status(400).json({ success: false, errors: "existing user found with same email id" })
        }
        let cart = {}
        for (let i = 0; i < 300; i++) {
            cart[i] = 0;
        }
        const user = new userModel({
            name: req.body.username,
            email: req.body.email,
            passowrd: req.body.password,
            cartData: cart
        })
        await user.save()
        console.log("sucessfully done the things");
        // for the jwt authentication
        const data = {
            user: {
                id: user.id
            }
        }

        const token = jwt.sign(data, 'secrect_ecom');
        res.json({ success: true, token })



    } catch (error) {
        console.error("Error in signUp:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}
//for the login of an user
const login = async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.body.email });
        if (user) {
            const passCompare = req.body.password === user.passowrd;
            if (passCompare) {
                const data = {
                    user: {
                        id: user.id
                    }
                }
                const token = jwt.sign(data, 'secret_ecom');
                res.json({ success: true, token })
            }
            else {
                res.json({ sucess: false, errors: "Wrong password" });
            }
        } else {
            res.json({ success: false, errors: "wrong email id" });
        }
    } catch (error) {
        res.status(500).json({ error: "error occured" })
    }
}


module.exports = { signUp, login }