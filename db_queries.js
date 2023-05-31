const { client} = require("./database");

const userQuery = {
    createTable: () => ("CREATE TABLE IF NOT EXISTS users(user_id SERIAL PRIMARY KEY,name VARCHAR(60) NOT NULL,email VARCHAR(100) NOT NULL UNIQUE,mobile VARCHAR(20) NOT NULL,dob DATE NOT NULL,password TEXT)"),
    insertUser: () => (`INSERT INTO users(name,email,mobile,dob,password) VALUES($1,$2,$3,$4,$5)`),
    getUserByEmail: ()=>(`SELECT * FROM users WHERE email = $1`)
}

const productQuery = {
    createTable: () => (`CREATE TABLE IF NOT EXISTS products(product_id VARCHAR(100) PRIMARY KEY,user_id INT NOT NULL,product_name VARCHAR(100) NOT NULL,category VARCHAR(100) NOT NULL,purchase_date DATE NOT NULL,company VARCHAR(100) NOT NULL,under_warranty BOOLEAN NOT NULL,description TEXT DEFAULT 'Description Not Available',image TEXT DEFAULT 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROfXyP5m-PLcLQ76H3YMjjhBWXlqfuv5V9ZjJfyT601A&s')`),

    insertProduct: () => (`INSERT INTO products(product_id,user_id,product_name,category,purchase_date,company,under_warranty,description,image) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)`),
    
    getProducts: () => (`SELECT * FROM products WHERE user_id = $1`),
    
    deleteProduct:()=>(`DELETE FROM products WHERE user_id = $1 AND product_id = $2`)

}

const createUserTable = async() => {
    const result = await client.query(userQuery.createTable())
    console.log("table created",result)
    return result
}

const insertUser = async (name,email,mobile,dob,password) => {
    try {
        const result = await client.query(userQuery.insertUser(),[name,email,mobile,dob,password])
        console.log("result from insertUser query",result)
        return result
    } catch (error) {
        console.log("error from insertion of user")
        return error
    }
}

const getUserByEmail = async (email) => {
    try {
        const result = await client.query(userQuery.getUserByEmail(),[email])
        return result
    } catch (error) {
        return error
    }
}

const createProductTable = async () => {

        const result = await client.query(productQuery.createTable());
        console.log("product table created", result)
        return result;

}

const insertProduct = async (user_id,product_id,product_name,category,purchase_date,company,under_warranty,description,image) => {
    try {
        const result = await client.query(productQuery.insertProduct(),[product_id, user_id, product_name, category, purchase_date, company, under_warranty, description, image]) 
        return result
    } catch (error) {
        console.log("error from product insertion ",error)
        return error
    }
}

const getProductsByUser_id = async (user_id) => {
    try {
        const result = await client.query(productQuery.getProducts(), [user_id])
        return result;
    } catch (error) {
        console.log("error from product view ",error)
        return error
    }
}

const deleteSingleProduct = async (user_id,product_id) => {
    try {
        const result = await client.query(productQuery.deleteProduct(), [user_id, product_id])
        return result
    } catch (error) {
        console.log("error from delete product",error)
        return error
    }
}

module.exports = {createUserTable,insertUser,getUserByEmail,createProductTable,insertProduct,getProductsByUser_id,deleteSingleProduct}