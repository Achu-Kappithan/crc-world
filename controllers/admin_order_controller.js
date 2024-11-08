const { updateLocale } = require("moment");
const Orders = require("../models/order")
const User = require("../models/user_models")

// for loading order list

const load_orderlist = async (req,res)=>{
    try {
        const page = req.query.page || 1 ;
        const limit = 5;

        const orderdata = await Orders.find()
        .populate("userId")
        .skip((page-1)*limit)
        .limit(limit)

        const totalorders = await Orders.countDocuments();
        const totalPages = Math.ceil(totalorders / limit)

        return res.status(200).render("order_list",{orderdata ,totalPages ,page })
    } catch (err) {
        console.log("error for loading order list ",err)
        return res.status(500).render("404",{message:"unable to complate your request"})
    }
}

// for loading order details page

const load_orderdetails = async (req,res)=>{
    try {
        id = req.query.id;
        const orderdetails = await Orders.findById(id).populate("userId");
        // console.log("order details for showing  admin order details",orderdetails)
        res.status(200).render("orderdetails",{order:orderdetails})
        
    } catch (err) {
        console.log("error for loading orderdetails page",err)
        res.status(500).render("404",{message:"Unable to load order details page Try again..!"})
        
    }
}


// for updating the order status

const Update_orderstatus = async (req,res)=>{
    try {
        const orderid = req.body.orderid;
        const status = req.body.selectedstatus;

        const existingstatus = await Orders.findById({_id:orderid})
        console.log("esisting",existingstatus)

        if(existingstatus.status =="Cancelled"){
            return res.json({success:false, message:"Can't change the order status of Cancelled Orders.."})
        }

        const udpatedata =  await Orders.findByIdAndUpdate(
            orderid,
            {$set:{ status :status }}
        )
        res.json({ success : true,message:"'Order status has been updated successfully!'"})
    } catch (err) {
        console.log("error for updating the order status",err)
        res.status(500).render("404",{message: "Unable to complate your request"})
    }
}




module.exports = {
    load_orderlist,
    load_orderdetails,
    Update_orderstatus
}