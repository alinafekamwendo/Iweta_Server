module.exports = (sequelize, DataTypes) => {
    const Roles= sequelize.define("Roles", {
      id:{
            type: DataTypes.BIGINT,
            allowNull: false,
             primaryKey: true 
          },
      Name:{
        type:DataTypes.STRING,
        allowNull:false,
      },
    });

    // Roles.associate = (models) => {
    //   Roles.hasMany(models.Users, {
    //     onDelete: "cascade",
    //   });
    
    // };
    return Roles;
  };
  