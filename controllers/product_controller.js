const {createProductTable, insertProduct,getProductsByUser_id,deleteSingleProduct} = require("../db_queries")

const register_product = async(req, res) => {
    try {
        const { user_id, product_id, product_name, category, purchase_date, company, under_warranty, description, image } = req.body
        
        if (user_id!==null && product_id!==null && product_name!==null && category!==null && purchase_date && company!==null  && under_warranty!==null  && description!==null  && image!==null ) {

            console.log("from register product ",req.body)

            //create product table if not exists
            await createProductTable();

           //insert product into db 
            const result = await insertProduct(user_id, product_id, product_name, category, purchase_date, company, under_warranty, description, image)

            console.log("product inserted ", result)
            
            if (result.rowCount > 0) {
                res.status(200).json({"success":true,message:"product created"})
            } else {
                res.status(409).json({error:"duplicate key","success":false})
            }

                 
        }else {
            res.status(400).json({error:"all fields required","success":false})
        }

    } catch (error) {
        res.status(400).json({error:"something gone wrong","success":false})
    }
}

const getProducts = async(req,res) => {
    try {
        let { email, user_id } = req.query;

        //parse string into number
        user_id = parseInt(user_id)

        console.log(req.query, email, user_id)
        
        const result = await getProductsByUser_id(user_id)

        console.log("get products result", result)
        
        if (result.rowCount > 0) {
            res.status(200).json({"success":true,"result":result.rows})
        } else {
            res.status(404).json({"success":false,error:"products not found"})
        }


    } catch (error) {
        console.log("error from get products ",error)
    }
}

const deleteProduct = async (req, res) => {
    try {
        let { email, user_id, product_id } = req.query;
        user_id = parseInt(user_id)
        console.log("from delete product controller ", req.query)
        
        const result = await deleteSingleProduct(user_id, product_id)
        
        console.log("delete product result ", result)
        
        if (result.rowCount > 0)res.status(200).json({success:true,result})
        else res.status(404).json({ "success": false,"error":"product does not exist" })

    } catch (error) {
        console.log("error from delete product ", error)
        res.status(400).json({"success":false,error})
    }
}

module.exports = {register_product,getProducts,deleteProduct}