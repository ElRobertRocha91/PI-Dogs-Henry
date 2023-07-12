const { getTemperamentApi } = require('../controllers/temperamentsController');

const getTemperamentsHandler = async (req, res) => {
    console.log('RUTA PARA OBTENER LOS TEMPERAMENTOS Y GUARDARLOS EN LA DATABASE');
    console.log('http://localhost:3001/temperaments');
    try {
        const dataTemperaments = await getTemperamentApi()
        if(!dataTemperaments.length){
            throw new Error('Fallo la solicitud, vuelva a intentarlo')
        }
        res.status(200).json(dataTemperaments);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

module.exports = { getTemperamentsHandler };
