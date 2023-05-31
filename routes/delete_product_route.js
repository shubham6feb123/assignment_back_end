const express = require("express")
const {isValidUser} = require("../middleware/password")
const {deleteProduct} = require("../controllers/product_controller")

const router = express.Router();

router.delete("/delete_product",isValidUser,deleteProduct)

module.exports = router;