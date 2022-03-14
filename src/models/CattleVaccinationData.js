module.exports = (sequelize, DataTypes) => {
    const CattleVaccinationData = sequelize.define("CattleVaccinationData", {
        id:{
            type: DataTypes.BIGINT,
            allowNull: false,
             primaryKey: true 
          },
      TypeOfVaccine:{
        type:DataTypes.STRING,
        allowNull:false,
      },
      Breed:{
        type:DataTypes.STRING,
        allowNull:false,
      },
      AgeOfVaccination:{
        type:DataTypes.STRING,
        allowNull:false,
      },
      Dosage:{
        type:DataTypes.DOUBLE,
        allowNull:false,
      },
      EffectiveAfter:{
        type:DataTypes.BIGINT,
        allowNull:false,
      },
      Duration:{
        type:DataTypes.STRING,
        allowNull:false,
      },
      Revaccination:{
        type:DataTypes.STRING,
        allowNull:false,
      },
    });
    return CattleVaccinationData;
  };
  