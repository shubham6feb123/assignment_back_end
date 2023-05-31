const express = require("express")
const { check_password } = require("../middleware/password")
const {login_user} = require("../controllers/user_controller")

const router = express.Router();

router.post("/login_user",check_password,login_user)

module.exports = router;