module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
 
});


  Users.associate = (models) => {
    Users.hasMany(models.Likes, {
      onDelete: "cascade",
    });
    Users.hasMany(models.Posts, {
      onDelete: "cascade",
    });
    Users.hasMany(models.Khola, {
      onDelete: "cascade",
    });
    Users.hasMany(models.Breeds,{
      onDelete:"cascade",
    });
   
    Users.hasMany(models.Livestock,{
      onDelete:"cascade",
    });
  
  };

  return Users;
};
