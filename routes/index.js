const express = require("express");
const router = express.Router();
const isloggedin = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");

router.get("/", function (req, res) {
  let error = req.flash("error");
  res.render("index", { error });
});

router.get("/shop", isloggedin, async function (req, res) {
  let products = await productModel.find();
  let success = req.flash("success"); // ✅ fixed spelling
  res.render("shop", { products, success }); // ✅ pass to view
});
router.get("/cart", isloggedin, async function (req, res) {
  let user = await userModel.findOne({ email: req.user.email }).populate("cart");

  let cartItems = user.cart;

  let totalMRP = 0;
  let totalDiscount = 0;
  let platformFee = 20;
  let shippingFee = 0;

  cartItems.forEach(product => {
    totalMRP += product.price;
    totalDiscount += product.discount;
  });

  let finalAmount = totalMRP - totalDiscount + platformFee + shippingFee;

  res.render("cart", {
    cartItems,
    totalMRP,
    totalDiscount,
    platformFee,
    shippingFee,
    finalAmount
  });
});


router.get("/addtocart/:id", isloggedin, async function (req, res) {
  let user = await userModel.findOne({ email: req.user.email });
  user.cart.push(req.params.id);  
  await user.save();
  req.flash("success", "Product added to cart successfully"); 
  res.redirect("/shop");
});

module.exports = router;
