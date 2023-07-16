import axios from 'axios';
import { GET_DOGS, GET_NAME_BY_BREENDS, GET_TEMPERAMENTS, FILTER_CREATED, FILTER_BY_TEMPERAMENT, ORDER_BY_NAME } from './action-types';

//Aqui creamos nuestra Actions Creators, que crea acciones,
//o sea que retornan un objeto que representa una acción.

//Aqui dispatch, como metodo de store, manda una acción
//de forma sincrónica a los reductores del store.
//Junto con el estado previo retornado por el store,
//para calcular el nuevo estado.

//Creo una función para conectar el Fronted con el Backend
export function getDogs () {
    return async function (dispatch){
        var json = await axios.get("http://localhost:3001/dogs");
        //console.log(json);
        return dispatch({
            type: GET_DOGS,
            payload: json.data
        })
    }
}

//Creamo una función que pondremos en un input, para obtener razas de perros por nombre
export function getNameByBrends(name){
    return async function(dispatch){
        try{
            var json = await axios.get("http://localhost:3001/dogs?name=" + name);
            return dispatch({
                type: GET_NAME_BY_BREENDS,
                payload: json.data
            })
        }catch(error){
            console.log(error)
        }
    }
}

//Funcion para filtrar button por temperamento
export function getTemperaments() {
    return async function(dispatch){
        try{
            var dataInfo = await axios.get("http://localhost:3001/temperaments")
            //Mapeo la dataInfo para obtener los nombres de los temperamentos
            //var nameTemperaments = dataInfo.data.map(el => el.name)
            // console.log(nameTemperaments);
            return dispatch({
                type: GET_TEMPERAMENTS,
                payload: dataInfo.data //nameTemperaments
            })

        }catch(error){
            console.log(error)
        }
    }
}

//Creamos la actions de filtrados
//Importante la acción solo despacha un type, toda la logica la hacemos en reducer o components

//Filtrado por creado en base de datos o proveniente de API
export function filterCreated(payload){
    console.log(payload)
    //Aqui payloand va a ser el "value" de la opción que nosotros elijamos cuando lo filtremos
    return{
        type: FILTER_CREATED,
        payload
    }
}

export function filterByTemperament(payload){
    return{
        type: FILTER_BY_TEMPERAMENT,
        payload
    }
}

//Filtro por ordenamiento de Name(nombre de razas)
export function orderByName(payload){
    return{
        type: ORDER_BY_NAME,
        payload
    }
}

//Filtro por ordenamiento de Weight(Peso de dog)
// export function orderByWeight(payload){
//     console.log(payload)
//     return{
//         type: 'ORDER_BY_WEIGHT',
//         payload
//     }
// }
