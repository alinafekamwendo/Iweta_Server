module.exports = (sequelize, DataTypes) => {
    const Breeds = sequelize.define("Breeds", {
/*
      breedId:{
        type: DataTypes.BIGINT,
         autoIncrement: true, 
         allowNull: false,
          primaryKey: true ,

      }, */
      breedName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      origin: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      active: {
        type: DataTypes.STRING,
        allowNull: false,
      } 
    });

    Breeds.associate = (models) => {
      Breeds.hasMany(models.Livestock, {
        onDelete: "cascade",
      });
      };
  
    Breeds.associate = (models) => {
      Breeds.hasMany(models.Livestock, {
        onDelete: "cascade",
      });
    };
    return Breeds;
  };
  