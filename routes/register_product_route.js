const express = require("express")
const {isValidUser} = require("../middleware/password")
const {register_product} = require("../controllers/product_controller")

const router = express.Router();

router.post("/register_product",isValidUser,register_product)

module.exports = router;