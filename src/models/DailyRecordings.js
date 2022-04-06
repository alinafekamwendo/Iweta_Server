module.exports = (sequelize, DataTypes) => {
    const DailyRecordings = sequelize.define("DailyRecordings", {
      Day:{
            type:DataTypes.STRING,
            allowNull:false,
          },
      Activities:{
        type:DataTypes.STRING,
        allowNull:false,
      },
      Diseases:{
        type:DataTypes.STRING,
        allowNull:false,
      },
      Affected:{
        type:DataTypes.BIGINT,
        allowNull:false,
      },
      Costs:{
        type:DataTypes.DECIMAL,
        allowNull:false,
      },
      Comments:{
        type:DataTypes.STRING,
        allowNull:false,
      },
    });
    return DailyRecordings;
  };
  