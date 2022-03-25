module.exports = (sequelize, DataTypes) => {
    const DailyRecordings = sequelize.define("DailyRecordings", {
      id:{
            type: DataTypes.BIGINT,
            allowNull: false,
             primaryKey: true 
          },
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
        type:DataTypes.STRING,
        allowNull:false,
      },
      Comments:{
        type:DataTypes.STRING,
        allowNull:false,
      },
    });
    return DailyRecordings;
  };
  