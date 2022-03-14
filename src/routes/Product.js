const express = require("express");
const ProductRouter = require("../controllers/Product/productController");
const Product = express.Router();

 
const ProductController=require("../controllers/Product/productController");
//register at /khola/create
Product.post("/product/create/:id",ProductController);
//all of specific user
Product.get("/product/bySupplier/:SupplierId",ProductRouter);
//find all users  at auth/users
Product.get("/product/All",ProductController);

//get a specific khola by id
Product.get("/product/byId/:id",ProductController);
//update
Product.put("/product/update/:id",ProductController);

//delete  by id at 3001/khola/delete/:id
Product.delete("/product/delete/:id",ProductController);
//category
module.exports = Product;
