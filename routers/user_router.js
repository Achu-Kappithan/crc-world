const express = require("express");
const user_route = express();
const path = require("path");
const bodyparser =require("body-parser");
const page404 = require("../middlewares/user404load")
const authmiddleware = require("../middlewares/user_auth")

const auth = authmiddleware.is_authaticated;
const verify = authmiddleware.is_alredylogined


// all controller
const user_controller = require("../controllers/user_controller");
const userproduct_controller = require("../controllers/userproduct_controller");
const usercart_controller = require("../controllers/usercart_controller");
const checkout_controller = require("../controllers/user_checkout");
const userprofile_controller = require("../controllers/userprofile_controller");
const userwishlist_controller = require("../controllers/userwishlist_controller")

user_route.use(bodyparser.urlencoded({ extended: true }));

user_route.set("view engine","ejs")
user_route.set('views',path.join(__dirname,"../views/users"))

//  register a new user
user_route.get("/register",user_controller.loadsignup);
user_route.post("/signup",user_controller.signup_user);
user_route.get("/otp",user_controller.user_send_otp);
user_route.post("/veryfing",user_controller.verify_otp);
user_route.post("/resend_otp",user_controller.resend_otp);

//  user login 
user_route.get("/load_home",auth,user_controller.loadhome);
user_route.post("/user_veryfing",user_controller.userverification);
user_route.get('/login',verify,user_controller.loadlogin);
user_route.get("/logout_user",user_controller.logout_user)

//reset password
user_route.get("/forgotpassword",user_controller.load_forgotpass);
user_route.post("/resetpass_otp",user_controller.resetpass_mail);
user_route.get('/reset_password/:token',user_controller.reset_password);
user_route.post("/update_password/:token",user_controller.update_password);

//product view page
user_route.get("/load_productview",auth,userproduct_controller.load_productview);
user_route.get("/get-size-details",userproduct_controller.load_sizesort);

// load shop page
user_route.get("/user_shop",auth,userproduct_controller.load_shop);
user_route.post("/product_filter", userproduct_controller.filterProducts);

// load cart patge
user_route.get("/load_usercart",auth,usercart_controller.load_cart);
user_route.post("/addto_cart",usercart_controller.addto_cart);
user_route.post("/remove_cartitem",usercart_controller.remove_cartitem);
user_route.post("/update_quntity",usercart_controller.update_quentity);

// checkout page
user_route.get("/user_checkout",auth,checkout_controller.load_checkout);
user_route.post("/checkoutedit_address",auth,checkout_controller.checkoutupdate_address);
user_route.post("/checkout_addaddress",auth,checkout_controller.checkout_newaddress);
user_route.post("/Placeorder",auth,checkout_controller.place_order)

//user profile 
user_route.get("/user_Profile",auth,userprofile_controller.load_userprofile);
user_route.post("/add_useraddress",auth,userprofile_controller.add_newaddress);
user_route.post("/edit_address",userprofile_controller.update_address);
user_route.post("/delete_address",userprofile_controller.delete_address);
user_route.get("/order_summary",auth,userprofile_controller.load_ordersummary);
user_route.get("/my_orders",auth, userprofile_controller.load_myorder);
user_route.post("/order_cancelled",userprofile_controller.cancell_order);

//user wishlist controller
user_route.get("/load_wishlist",userwishlist_controller.load_whishlist);
user_route.post("/addto_wishlist",userwishlist_controller.addto_wishlist);
user_route.post("/remove_item",userwishlist_controller.remove_wishlistitem);







// user_route.use(page404)




module.exports = user_route;