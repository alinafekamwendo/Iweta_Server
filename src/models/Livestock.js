module.exports = (sequelize, DataTypes) => {
  const Livestock = sequelize.define("Livestock", {

    userBreedName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Dob:{
      type :DataTypes.STRING,
      allowNull:false,
    },
    origin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    region:{
      type :DataTypes.STRING,
      allowNull:false,
    },
    active: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  return Livestock;
};
