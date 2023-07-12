const { /*getApiInfo, getDbInfo,*/ getAllDogs } = require('../controllers/dogsController');
const { Temperament, Dog } = require('../db');


//Funciones manejadoras para DOGS

const getDogsHandler = async (req, res) => {
    console.log('ESTA ES LA RUTA PRINCIPAL Y SI LLEGA ALGO POR QUERY TAMBIEN');
    console.log('RUTA A http://localhost:3001/dogs Y A http://localhost:3001/dogs?name="..."');
    try {
        const { name } = req.query;
        let dogsTotal = await getAllDogs();
        //Valido si tengo name
        if(name){
            let dogsTotal = await getAllDogs();
            //dogsTotal = [{...},{...},{...}]
            let raceName =  await dogsTotal.filter(
                el => el.name.toLowerCase().includes(name.toLowerCase())
            )
            if(raceName){
                //console.log(raceName);
                res.status(200).json(raceName);
            }else{
                res.status(404).send('No existe la raza, por favor registrela por medio del formulario');
            }
        }else{
            res.status(200).json(dogsTotal);
        }       
    } catch (error) {
        console.log(error);
    }
};

/*------------------------------------------------------------*/

const getDogByIdHandler = async (req, res) => {
    console.log('RUTA A http://localhost:3001/dogs/id REALIZADA CON EL METODO FIND()');
    try {
        const { id } = req.params;
        //Me guardo toda la info en una const:
        const infoTotal = await getAllDogs();
        //Verifico si me llega el idRaza y si no llega por params, le enviamos toda la info de las razas:
        if(id){
            let raceFind = infoTotal.find(
                el => el.id.toString() === id
            )
            //console.log(razaFind);
            if(!raceFind){
                res.status(404).send('Lo siento pero no esta la raza con el id solicitado, vuelva a intentarlo');
            }else{
                res.status(200).json(raceFind)
            }
        }else{
            res.status(200).json(infoTotal);
        }
    } catch (error) {
        console.log(error);
    }
};

/**----------------------------------------------------------**/

const createDogHandler = async (req, res) => {
    console.log('ESTA ES LA RUTA PARA CREAR UNA RAZA - POST- http://localhost:3001/dogs');
    try {
        const { name, heightMax, heightMin, weightMax, weightMin, life_span, image, temperament } = req.body;
        //Verifico si me llegan los datos obligatorios:
        if(!name || !heightMax || !heightMin || !weightMax || !weightMin || !life_span || !image){
            res.status(404).send('Falta enviar datos obligatorios');
        }
        //console.log(req.body)
        let newDogCreated = await Dog.create({
            name,
            heightMax,
            heightMin,
            weightMax,
            weightMin,
            life_span,
            image
        });
        //console.log(raceCreated)
        //El temperamento se los pasamos aparte, para armar las relaciones:
        let temperamentDb = await Temperament.findAll({
            where: {name: temperament}
        })    
        newDogCreated.addTemperament(temperamentDb)
        //console.log(temperamentDb)
        //Agregamos el temperamento a la raza creada y enviamos un msj de confirmación:
        res.status(201).send('Raza creada con exito')
    } catch (error) {
        res.status(404).send('Fallo la creación de la raza, en la base de datos, vuelva a intentarlo')
    }
};

module.exports = { getDogsHandler, getDogByIdHandler, createDogHandler };

