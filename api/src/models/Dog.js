const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey : true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,//Campo obligartorio
    },
    heightMax: {//Altura Max
      type: DataTypes.STRING,
      allowNull: false,
    },
    heightMin:{
      type:DataTypes.STRING,
      allowNull:false
    },
    weightMax: {//Peso Max
      type: DataTypes.STRING,
      allowNull: false,
    },
    weightMin: {
      type :DataTypes.STRING,
      allowNull: false
    },
    life_span: {//Esperanza de vida
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    createInDb: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue: true,
    }
  },{
    timestamps: false
  });
};
