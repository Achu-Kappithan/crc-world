const express = require("express")
const admin_route = express()
const path = require("path")
const bodyparser = require("body-parser")
const is_auth = require("../middlewares/admin_auth")
const auth = is_auth.is_authaticated
const loged_in = is_auth.is_alredylogedin
const pageload404 = require("../middlewares/404load")



// controllers group
const admin_controller = require("../controllers/admin_controller");
const brand_controller = require("../controllers/brnd_controller");
const product_controller = require("../controllers/product_controller");
const order_controller  = require("../controllers/admin_order_controller");
const offer_controller = require("../controllers/admin_offercontroller");
const salereport_controller = require("../controllers/admin_salesreprort");


const upload = require('../config/multer');
const uploadProductImages = require('../config/productMulter'); 

admin_route.use(bodyparser.urlencoded({extended:true}))

admin_route.set("view engine","ejs")
admin_route.set('views',path.join(__dirname,"../views/admin"))
// authotication 

admin_route.get("/admin",loged_in,admin_controller.load_adminlogin);
admin_route.post("/verify",admin_controller.admin_verify);
admin_route.get("/admin_home",auth,admin_controller.load_home);
admin_route.get("/dashbord",auth,admin_controller.load_dashbord);
admin_route.get("/logout",admin_controller.admin_logout);

// Usermanagement and  category
admin_route.post("/blockuser",admin_controller.blockuser);
admin_route.post("/unblockuser",admin_controller.unblockuser);
admin_route.get("/Addcategory",auth,admin_controller.load_category);
admin_route.post("/addcategory",admin_controller.add_category);
admin_route.post("/delite_cat",admin_controller.remove_category);
admin_route.get("/lodcatedit",auth,admin_controller.load_editcategory);
admin_route.post("/edit_cat",admin_controller.edit_category);

//  brand
admin_route.get("/brand",auth,brand_controller.load_brand);
admin_route.get("/newbrand",auth,brand_controller.load_newbrand);
admin_route.post('/addbrand', upload.single('image'), brand_controller.add_newbrand);
admin_route.post("/deletebrand",brand_controller.delete_brand);
admin_route.get("/editbrand",auth,brand_controller.edit_brand);
admin_route.post("/updatebrand", upload.single('image'),brand_controller.update_brand)


// product controller
admin_route.get("/lodadadd_product",auth,product_controller.loadadd_product);
admin_route.post("/add_product", uploadProductImages.array('productimage', 3), product_controller.add_product);
admin_route.get("/admin_productlist",auth,product_controller.product_list);
admin_route.get("/edit_product",auth,product_controller.loadedit_product);
admin_route.post("/update_product",uploadProductImages.array('productimage', 3),product_controller.update_product);
admin_route.post("/productunllist",auth,product_controller.unlist_product);
admin_route.post("/sortbystatus",product_controller.admin_productsort);


// order controller
admin_route.get("/orders_list",auth,order_controller.load_orderlist);
admin_route.get("/load_orderdetails",auth,order_controller.load_orderdetails);
admin_route.post("/change_status",auth,order_controller.Update_orderstatus);

// offer controller
admin_route.get("/load_offerlist",auth,offer_controller.load_offerlist);
admin_route.get("/loadcreateoffer",auth,offer_controller.load_newoffer);
admin_route.post("/add_categoryoffer",offer_controller.add_categoryoffer);
admin_route.post("/removecatoffer",offer_controller.remove_catoffer);
admin_route.get("/load_catofferedit",auth,offer_controller.load_editcatoffer);
admin_route.post("/update_catoffer",offer_controller.update_catoffer);
admin_route.post("/add_productoffer",offer_controller.add_productoffer);
admin_route.get("/load_editproductoffer",auth,offer_controller.load_editProductoffer);
admin_route.post("/update_productoffer",offer_controller.update_productoffer);
admin_route.post("/romove_productoffer",offer_controller.remove_productoffer);
// coupon  controller
admin_route.get("/load_couponlist",auth,offer_controller.load_couponlist);
admin_route.post("/add_coupon",offer_controller.add_coupon);
admin_route.get("/load_editcoupon",auth,offer_controller.load_editcoupon);
admin_route.post("/update_coupon",offer_controller.update_coupons);
admin_route.post("/remove_coupons",offer_controller.remove_coupons);

//sales reprort controller

admin_route.post("/get_customereport",salereport_controller.load_customreport);






// for loading 404 page
admin_route.use(pageload404)


module.exports= admin_route;