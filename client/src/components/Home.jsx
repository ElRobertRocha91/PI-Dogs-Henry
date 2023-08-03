import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogs, filterCreated, orderByName, filterByTemperament, getTemperaments } from '../actions';
import { Link } from 'react-router-dom';
import Card from './Card';
import Paginado from './Paginado';
import SearchBar from './SearchBar';

export default function Home (){

    const dispatch = useDispatch()
    const allDogs = useSelector((state) => state.dogs)
    console.log(allDogs);
    const allTemperaments = useSelector((state) => state.temperaments)
    const [orden, setOrden] = useState('')

    //Paginado
    //Primero definimos varios estados locales
    //Primero una estado de la pagina actual y estado que me se sete la pagina actual
    const [currentPage, setCurrentPage] = useState(1)
    //Luego un estado que me dira cuantas razas tengo por pagina y un estado que me va a setear la pagina
    const [breedsPerPage, setBreedsPerPage] = useState(8)
    //Luego de esto me declaro un const de la ultima raza
    //Esto va a ser igual al estado actual por la cantidad de razas que apareceran
    const indexOfLastRace = currentPage * breedsPerPage //(3)*(8)
    //Declaro otra const que va a ser indice de la primera raza
    //que va a ser igual al indice de la ultima raza - las razas por pagina
    const indexOfFirstRace = indexOfLastRace - breedsPerPage
    //Ahora vamos a hacer una const que tendra las razas de la pagina actual
    //allDogs es un array con todas las razas
    const currentRace = allDogs.slice(indexOfFirstRace, indexOfLastRace)

    //Declaro un const paginado, a la cual levamos a pasar un numero de la pagina, y vamos a setear la pagina en ese numero de paginas 
    //Esto nos ayudara en el renderizado
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }


    useEffect(() => {
        dispatch(getDogs());
        dispatch(getTemperaments())
    },[dispatch])

    //HancleClick nos reseteara de vuelta todo el estado de getDogs()
    function handleClick (e){
    e.preventDefault();
    dispatch(getDogs());
    }

    //------------------------------------------------------//
    //Me creo una función que me reflejara los cambios cuando se active el button del filtrado de temperamentos
    //function handleTemperaments(e){}

    //-------------------------------------------------------------//

    //Luego de hacer el filtrado por creado en db o de API, hacemos el dispatch
    
    function handleFilterCreated (e){
        dispatch(filterCreated(e.target.value))//e.target.value => es el payload => Es el value de los <selection>
    }
    
    //-------------------------------------------------------------//

    //Luego de hacer el ordenamiento asc y desc. Hacemos el dispatch
    function handleSort (e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }

    //--------------------------------------------------------------//
    //Aqui hacemos el dispatch del ordemaniento por peso
    // function handleSortWeigth (e){
    //     e.preventDefault();
    //     dispatch(orderByWeight(e.target.value))
    // }
    function handleFilterTemperaments(e){
        //e.preventDefault(e)
        //setCurrentPage(1)
        dispatch(filterByTemperament(e.target.value));
        setOrden(`${e.target.value}`);
    }

    return(
        <div>
            <Link to='/dogs'>Create dog</Link>
            <h1>My App to DOGS</h1>
            <button onClick={e => {handleClick(e)}}>
                Volver a cargar todas las razas
            </button>
            <SearchBar/>
            <div>
                <select onChange={e => handleSort(e)}>
                    <option value="asc">Ascendente"A-Z"</option>
                    <option value="des">Descendente "Z-A"</option>
                </select>
                <select>
                    <option value="men-may">Men-May</option>
                    <option value="may-men">May-Men</option>
                </select>
                <select onChange={e => handleFilterCreated(e)}>
                    <option value="All">Todos</option>
                    <option value="Created">Creado en DB</option>
                    <option value="Existing">De la API</option>
                </select>
                <select onChange={e => handleFilterTemperaments(e)}>
                    <option value="All">Todos Temperamentos</option>
                    {
                        allTemperaments?.map(el => (
                            <option key={el.id} value={el.name}>{el.name}</option>
                        ))
                    }
                </select>
                <Paginado
                breedsPerPage={breedsPerPage}
                allDogs={allDogs.length}
                paginado={paginado}
                />
                {currentRace?.map((i) => {
                    return(
                        <Link to={'/home/' +  i.id}>
                            <Card key={i.id} image={i.image} name={i.name} weightMin={i.weightMin} weightMax={i.weightMax} temperament={i.temperament}/>
                        </Link>          
                      );                       
                    })
                }
            </div>
        </div>
    )
}