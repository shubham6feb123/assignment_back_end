const express = require("express")
const { hash_password } = require("../middleware/password")
const {register_user} = require("../controllers/user_controller")

const router = express.Router();

router.post("/register_user",hash_password,register_user)

module.exports = router;