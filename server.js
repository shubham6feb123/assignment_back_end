const express = require("express")
const cors = require("cors")
const app = express()
require("dotenv").config();
const { connectToDB } = require("./database");
const register_route = require("./routes/register_route")
const login_route = require("./routes/login_route")
const register_product_route = require("./routes/register_product_route") 
const get_products_route = require("./routes/get_products_route")
const delete_product_route = require("./routes/delete_product_route")
    
app.use(cors())
app.use(express.json())

connectToDB();

app.get("/", async(req, res) => {
    //  createUserTable();
    res.send("you got it")
})

//register user route
app.use("/api/v1", register_route)

//login user route
app.use("/api/v1", login_route)

//register product route
app.use("/api/v1", register_product_route)

//get products route
app.use("/api/v1", get_products_route)

//delete product route
app.use("/api/v1",delete_product_route)


app.listen(8000, () => {
    console.log("Running server !")
})
