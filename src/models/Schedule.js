module.exports = (sequelize, DataTypes) => {
    const Schedule = sequelize.define("Schedule", {
      Day:{
            type:DataTypes.STRING,
            allowNull:false,
          },
      Activity:{
        type:DataTypes.STRING,
        allowNull:false,
      },
    });
    return Schedule;
  };
  