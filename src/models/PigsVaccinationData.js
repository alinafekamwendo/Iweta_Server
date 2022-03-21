module.exports = (sequelize, DataTypes) => {
    const PigsVaccinationData = sequelize.define("PigsVaccinationData", {
        id:{
            type: DataTypes.BIGINT,
            allowNull: false,
             primaryKey: true 
          },
      NameOfDisease:{
        type:DataTypes.STRING,
        allowNull:false,
      },
      Vaccine:{
        type:DataTypes.STRING,
        allowNull:false,
      },
      FirstDose:{
        type:DataTypes.BIGINT,
        allowNull:false,
      },
      Booster:{
        type:DataTypes.STRING,
        allowNull:false,
      },
      Subsequent:{
        type:DataTypes.BIGINT,
        allowNull:false,
      },
      Dosage:{
        type:DataTypes.STRING,
        allowNull:false,
      },
    });
    return PigsVaccinationData;
  };
  