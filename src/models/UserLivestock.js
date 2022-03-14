module.exports = (sequelize, DataTypes) => {
    const UserLivestock = sequelize.define("UserLivestock", {
  
      IdentityNumber:{
        type: DataTypes.BIGINT, 
        allowNull: false,
         //primaryKey: true 
      },
      type:{
        type :DataTypes.STRING,
        allowNull:false,
      },
      Breed: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Vaccinated:{
        type :DataTypes.BOOLEAN,
        allowNull:false,
      },
    });
  
    return UserLivestock;
  };
  