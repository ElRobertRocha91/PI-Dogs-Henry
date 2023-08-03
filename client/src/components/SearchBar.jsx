//En este componente nos treremos la action para el caso get name by breeds del reducer

import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNameByBrends } from '../actions';
import Paginado from './Paginado';

//SerchBar (Buscar en Barra)
export default function SearchBar(){
    const dispatch = useDispatch()
    const [ name, setName ] = useState("")

    //Aqui hacemos la logica del submit:
    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
        Paginado(1)//Invicamos a la arrown function paginado para que nos muestre ese numero de pagina 
        // if(!e.target.value){
        //     setName("")
        // }
        console.log(name)//Para que veamos por consola como se va modificando
    }
    //Ahora a esta función se la pasamos al input

    //Aqui la lógica del button:
    function handleSubmit(e){
        e.preventDefault()
        if(!name){
            return alert("Please input a name to start the search")
        }else{
            dispatch(getNameByBrends(name))
            setName("")//Aplicamos un if else para que despues de hacer click en buscar setee nuestro estado a un string vacio nuevamente(limpiado el placeholder nuevamente)
        }
        //Despachamos la acción y le pasamos el e.target.value => name
        //Por lo tanto, el name va a ser mi estado local, y nosotros vamos a ir guardando lo que esta tipeando el usuario, en mi estado local name.
        //Entonces lo que yo tenga en mi estado local derepente va a llegarle despues a mi acción, que va a llamar al back y va a pasarle este name que es lo que esta escribiendo el usuario
    }

    //Renderizado:
    return (
        <div>
            <input type='text' placeholder='Search...' onChange={(e) => handleInputChange(e)} value={name}/>
            <button type='submit' onClick={(e) => handleSubmit(e)}>Buscar</button>
        </div>
    )
    
}