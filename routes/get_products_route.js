const express = require("express")
const {isValidUser} = require("../middleware/password")
const {getProducts} = require("../controllers/product_controller")

const router = express.Router();

router.get("/get_products",isValidUser,getProducts)

module.exports = router;