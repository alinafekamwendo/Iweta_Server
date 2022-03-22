module.exports = (sequelize, DataTypes) => {
  const Consultants = sequelize.define("Consultants", {
  FirstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    district: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    station: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
 
});


  Consultants.associate = (models) => {
    Consultants.hasMany(models.Likes, {
      onDelete: "cascade",
    });
    Consultants.hasMany(models.Posts, {
      onDelete: "cascade",
    });
    Consultants.hasMany(models.Khola, {
      onDelete: "cascade",
    });
    Consultants.hasMany(models.Livestock,{
      onDelete:"cascade",
    });
  
  };

  return Consultants;
};
