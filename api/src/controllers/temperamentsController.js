const { Temperament } = require('../db');
const { getApiInfo } = require('./dogsController.js');

//Función controladora para traer los temperamentos de la API

/**-----Obtengo  los temperamentos de la API------**/

const getTemperamentApi = async () => {
    //Busco si ya estan en la database 
    // const temperamentsList = await Temperament.findAll({
    //     attributes: ['name']
    // });
    //Si no estan las traigo de la API
   // if(temperamentsList.length === 0){
        const temperamentApi = await getApiInfo();
        //console.log(temperamentApi);
        //Mapeo todos los objetos del array y me quedo con todos sus temperamentos
        const temperamentsMap = temperamentApi.map(
            el => el.temperament
        )
        //console.log(temperamentsMap);// ==> [',,,,', ',,,,' , ',,,']
        const temperamentString = temperamentsMap.join();
        //console.log(temperamentString)//=> "..., ..., ...," hasta aqui tengo un string que engloba a todos los temperamentos
        const temperamentArray = temperamentString.split(',');
        //console.log(temperamentArray);//=>['...', '..', ' ..'] Uno con un split y tengo mi arreglo con los temperamentos con su propio indice
        //mapeo una ves mas para descartar los espacios vacios(null)
        // const temperamentSinNull = temperamentArray.map(el => 
        //     el.length?el.trim():'Raza Desconocida'/*{return el.trim()}*/)
        //console.log(temperamentSinNull);//=> Hay repetidos atento..!

        //Elimino los repetidos:
        const uniqueTempers = [];
        temperamentArray.forEach(el => {
            if(!uniqueTempers.includes(el)){
                uniqueTempers.push(el)
            }
        });
        //console.log(uniqueTempers)

        // const nameTemperament = [...new Set(temperamentArray)];
        // //console.log(nameTemperament);
        // //Recorro el arreglo y lo busco en la database, si no existe lo creo con el método de sequelize(findOrCreate)
        uniqueTempers.forEach( async (el) => {
            await Temperament.findOrCreate({
                where: {name: el}
            })
        }
        )
        //Por ultimo llamo a toda la info cargada en la database
        const allTemperaments = await Temperament.findAll();
        //console.log(allTemperaments)
        return allTemperaments;
    //}

}
//getTemperamentApi()

module.exports = { getTemperamentApi };
