module.exports = (sequelize, DataTypes) => {
    const FeedingData = sequelize.define("FeedingData", {
        id:{
            type: DataTypes.BIGINT,
            allowNull: false,
             primaryKey: true 
          },
      Age:{
        type:DataTypes.BIGINT,
        allowNull:false,
      },
      Weight:{
        type:DataTypes.DOUBLE,
        allowNull:false,
      },
      DailyGaining:{
        type:DataTypes.BIGINT,
        allowNull:false,
      },
      FeedConsumption:{
        type:DataTypes.DOUBLE,
        allowNull:false,
      },
      WaterConsumption:{
        type:DataTypes.DOUBLE,
        allowNull:false,
      },

    });
    return FeedingData;
  };
  