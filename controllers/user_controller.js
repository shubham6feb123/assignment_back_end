const {createUserTable,insertUser} = require("../db_queries")

const register_user = async(req,res) => {
   try {
       console.log("from register_user controller", req.body)
       const {name,email,mobile,dob,hashed_password} = req.body
       
        //create user table if not created
       await createUserTable()
       
       //register(insert) user in db
       const result = await insertUser(name, email, mobile, dob, hashed_password)
       
      console.log("user registered ", result)
      
         if(result.name=="error")throw new Error(result)   
      
        res.status(201).json({success:true,result})
   } catch (er) {
      console.log("error -> ",er)
      res.status(409).json({error:"Key Duplication","success":false})
   }
}

const login_user = async (req, res) => {
   try {
      const { user_id, name, email, mobile, dob } = req.user;
      res.status(200).json({"success":true,data:{user_id, name, email, mobile, dob}})
   } catch (error) {
      res.status(401).json({error,"success":false})
   }
}

module.exports = {register_user,login_user}