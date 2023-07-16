
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "../reducer";

//Aqui creamos nuestra instancia de store central de Redux
//La función createStore recibe el 'reducer' que es responsable de la
//actualización del store y lo exportamos para que lo identifique
//el compoenete provider que es donde vive store y recibe el estado.

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))