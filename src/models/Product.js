module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define("Product", {
        ProductId:{
            type: DataTypes.BIGINT,
            allowNull: false,
            autoIncrement:true,
             primaryKey: true 
          },
      Name:{
        type:DataTypes.STRING,
        allowNull:false,
      },
      Category:{
        type:DataTypes.STRING,
        allowNull:false,
      },
      Description:{
        type:DataTypes.STRING,
        allowNull:false,
      },
      Price:{
        type:DataTypes.STRING,
        allowNull:false,
      },
      Supplier:{
        type:DataTypes.STRING,
        allowNull:true,
      },
     
    });
    return Product;
  };
  