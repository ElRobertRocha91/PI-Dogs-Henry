const { Dog, Temperament } = require('../db');
const axios = require('axios');

//En este modulo estableceremos las funciones controlladores para dogs

/**-------Obtengo la Info de la API-------**/

const getApiInfo = async () => {
    try{
    const apiUrl = await axios.get('https://api.thedogapi.com/v1/breeds');
    //console.log(apiUrl);
    const apiInfo = await apiUrl.data.map(el => {
        return {
            id: el.id,
            name: el.name,
            heightMax: el.height.metric.split(" - ")[1] ?
            el.height.metric.split(" - ")[1] :
            el.height.metric.split(" - ")[0],
            heightMin: el.height.metric.split(" - ")[0],
            weightMax: el.weight.metric.split(" - ")[1] ?
            el.weight.metric.split(" - ")[1] :
            el.weight.metric.split(" - ")[0],
            weightMin: el.weight.metric.split(" - ")[0],
            life_span: el.life_span,
            image: el.image.url,
            temperament: el.temperament ?
            el.temperament.split(',').map(el => {return el.trim()}) :
            ["Temperamento Sin Identificar"],
        };
    });
    //console.log(apiInfo);
    return apiInfo;
    }catch(error){
        console.log(error)
    }
};

/**------Obtengo la Info de la DATABASE------**/

const getDbInfo = async () => {
    //Me traigo la info de la Base de datos
    try {
        const dataInfo = await Dog.findAll({
            include: {
                model: Temperament,
                attributes: ['name'],
                through: {
                    attributes: [],
                }
            }
        })
        //console.log(dataInfo)
        const dataValuesDogs = dataInfo.map(el => {return el.dataValues});
        //console.log(dataValuesDogs);

        const infoDataMap = await dataValuesDogs.map(el => {
            return{
                id: el.id,
                name: el.name,
                heightMax: el.heightMax,
                heightMin: el.heightMin,
                weightMax: el.weightMax,
                weightMin: el.weightMin,
                life_span: el.life_span,
                image: el.image,
                temperament: el.temperament.map(el => el.name).join(', '),
                createInDb: el.createInDb
            }
        })
        //console.log(infoDataMap)
        return infoDataMap;
    }catch(error) {
        console.log(error)
    }
};

/**------Obtengo toda la Info junta de la API y de la DATABASE-----**/

const getAllDogs = async () => {
    try {
        const apiInfo = await getApiInfo();
        const dbInfo = await getDbInfo();
        const infoTotal = apiInfo.concat(dbInfo);
        //const infoTotal = [...dbInfo, ...apiInfo]
        
        //console.log(infoTotal);
        return infoTotal;// retornamos un array => [...]
        
    } catch (error) {
        console.log(error)  
    }
};


module.exports = { getApiInfo, getDbInfo, getAllDogs };
