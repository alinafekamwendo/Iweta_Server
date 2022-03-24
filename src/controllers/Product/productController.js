const express = require("express");
const ProductController = express.Router();
const nodeCron=require('node-cron');
const {Users,Product:Products} = require("../../models");
const { validateToken } = require("../../../middlewares/AuthMiddleware");
const cattleVaccines=require("../../models/CattleVaccines.json");
const pigsVaccines=require("../../models/PigsVaccines.json");
const feeding=require("../../models/FeedingRequirementsData.json");

ProductController.get("/product/All", async (req, res,next) => {
try {
  
const products = await Products.findAll();
  res.status(200).json(products);
  console.log(products)

} catch (error) {
  next(error);
}

});

 ProductController.get("/product/bySupplier/:SupplierId", async (req, res,next) => {
try {
 
  const id = req.params.SupplierId;
  const productBySupplier = await Products.findAll({ where: {UserId: id}});
  res.status(200).json(productBySupplier);
} catch (error) {
  next(error);
}
 });


 ProductController.get("/product/byId/:id", async (req, res,next) => {
   try {
    const id = req.params.id;
    const product=await Products.findOne({where:{ProductId:id}});
    if(product){
     res.status(200).json(product);
    }else{
      res.status(404).json("Not found");
    }
   } catch (error) {
     next(error);
   }
  
  });


ProductController.post("/product/create/:id",validateToken, async (req, res,next) => {

  //variables
 
  try {
    const {Name,Category,Description,Price}=req.body;
    const id=req.params.id;
    const userInfor=await Users.findOne({ where: {id:id} });
    const duplicateProduct=await Products.findOne({where:{Name:Name,Category:Category,UserId:id}});
    if(duplicateProduct){return res.status(409).json("already registered")};
    try {
        const product=req.body;
        product.UserId=id;
       await Products.create(product)
            res.status(200).json(product);
            console.log("successful");
    } catch (error) {
        
    }
  
  } catch (error) {
      next(error);
  }
  
  
});


 ProductController.delete("/product/delete/:id", async (req, res,next) => {
   try {
    const productId = req.params.id;
    await Products.destroy({
      where: {
        ProductId:productId,
      },
    });
    res.status(200).json("DELETED SUCCESSFULLY");
   } catch (error) {
     next(error);
   }
 
});

ProductController.put("/product/update/:id", async (req, res,next) => {
 
try {
  const id = req.params.id;
  const available=await Products.findOne({where:{ProductId:id}})
  if(available){
    await Products.update(req.body,{
        where: {
          ProductId:id,
        },
      });
      res.status(200).json("updated succesfully");
  }else{
    return res.status(400).json("NO such product available");
  }
  
} catch (error) {
next(error);
}

});

  // nodeCron.schedule('* * * * *', function() {
  //   try {
   
  //   console.log('running a task every SECOND');
  // } catch (error) {
  //   res.send(500).json({error:error.message});
  // }  
  // });


module.exports = ProductController;