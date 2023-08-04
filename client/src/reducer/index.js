//Recordatorio de reducers en Redux:
//Las funciones reducers son funciones puras, que toman el estado anterior
//y una acción y retornan el nuevo estado.
/*
Entondes un reducer toma un estado viejo(actual) y una acción 
y devuelven un estado nuevo.

Como función pura:
_No debe mutar directamente el estado y
_No debe usar datos que no hayan sido pasados por argumentos

Siempre deben tratar el estado actual como sólo lectura,
el reducer no cambia el estado, sino que devuelve un estado nuevo.
*/

//import { verifOrder } from "../actions"

const initialState = {
    dogs : [],//array con todo lo que me devuelve el back, la info que quiero en mi pagina principal home
    allDogs: [],//copia del estado con todo lo que me devuelve el back toda la info de dogs
    temperaments: []
}
//Aqui en mi estado dogs , que en un principio es un array vacio, manda todo lo que te envien la action de dogs
function rootReducer (state= initialState, action) {
    switch(action.type){
        case "GET_DOGS":
            return{
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            }
        case "GET_TEMPERAMENTS":
            return{
                ...state,
                temperaments: action.payload
            }    
        case "FILTER_BY_TEMPERAMENTS":
        // const copyDogs = state.allDogs
        // //Para filtrar los temperamentos que fueron creados en db o los que vienen de api, vamos a tener que traer toda la info concatenada en el estado de dogs
        // const temperamentFilter = action.payload === "All" ?
        // copyDogs :
        // copyDogs.filter(el => el.temperament.includes(action.payload))
        const filterByTemperament = action.payload === 'All' ? 
        state.allDogs : 
        state.allDogs.filter(el => el.temperament.includes(action.payload))
        console.log(filterByTemperament)
        return{
            ...state,
            dogs: filterByTemperament
        }
        //Ahora haremos el componente en el serchBar.jsx para el caso GET_NAME_BY_BREEDS
        case "GET_NAME_BY_BREENDS":
            return{
                ...state,
                dogs:action.payload
            }
        //Filtrado para renderizar solo los creados en base de datos y si no es el caso, que me lleguen los de la API
        case "FILTER_CREATED":
        const allDogsCopy = state.allDogs
        const createdFilter = action.payload === 'Created' ? 
        allDogsCopy.filter((el) => el.createInDb) : 
        allDogsCopy.filter((el) => !el.createInDb) ;
        console.log(allDogsCopy);
        // Falla el filtrado revisar
            return{
                ...state,
                dogs: action.payload === 'All' ? state.allDogs: createdFilter
            }

        case "ORDER_BY_NAME":
        let sortedArray = action.payload === 'asc' ?
        //Si la action.payload es "asc"
        //Entra en mi estado de dogs, hacele un sort() y ordenalos de la A-Z. Caso contrario ordenalo de la Z-A.
        state.dogs.sort(function(a, b) {
            if(a.name > b.name){
                return 1;
            }
            if(b.name > a.name){
                return -1;
            }
            return 0;
        }):
        state.dogs.sort(function (a, b){
            if(a.name > b.name){
                return -1;
            }
            if(b.name > a.name){
                return 1;
            }
            return 0;
        })
            return{
                ...state,
                dogs: sortedArray
            }
        // case "ORDER_BY_WEIGHT":
        //     //Aplicamos un ternario
        //     let sortArrayWeight = action.payload === 'men-may' ?
        //     //Si action.payload es men-may (value='men-may')
        //     //Entra a mi estado dogs, hacele un sort de ordenamiento y verifica que no haya valores NaN
        //     state.dogs.sort(function(a, b) {
        //         return verifOrder(a.weight.split(' - ')) - verifOrder(b.weight.split(' - '))
        //     }):
        //     state.dogs.sort(function(a, b) {
        //         return verifOrder(b.weigth.split(' - ')) - verifOrder(a.weight.split(' - '))
        //     })
        //     return{
        //         ...state,
        //         dogs: sortArrayWeight
        //     }
        default:
            return state;
    }
}

export default rootReducer;