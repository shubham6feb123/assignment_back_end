const bcrypt = require("bcryptjs");
const { getUserByEmail } = require("../db_queries");

const hash_password = async(req, res, next) => {
    const { name, email, password, dob, mobile,confirmpassword } = req.body;
    
    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(password, salt)
    req.body.hashed_password = hashed_password;
    console.log(req.body)
    next();
}

const check_password = async(req, res, next) => {
    const { email } = req.body;
    console.log(req.body,typeof email)
    const user = await getUserByEmail(email);
    if (user.rowCount != 0) {
        const { user_id, name, email, mobile, dob, password } = user.rows[0]
        const isMatch = await bcrypt.compare(req.body.password, password)
        if (isMatch) {
            req.user = { user_id, name, email, mobile, dob, password };
            next();
        } else {
            res.status(401).json({error:"Invalid Credentials"})
        }
    } else {
        res.status(404).json({error:"record not found"})
    }
    console.log("checking password",user)
    
}

const isValidUser = async(req,res,next) => {
    try {
        const { user_id, email } = Object.keys(req.body).length>0?req.body : req.query;
        
        console.log(req.body,req.query)
        const user = await getUserByEmail(email);
        console.log("user validation ",user)
        if (user.rowCount !== 0) next();
        else res.status(401).json({error:"unauthorized user","success":false})
    } catch (error) {
        res.status(401).json({error:"unauthorized user","success":false})
    }
}

module.exports = { hash_password,check_password,isValidUser};