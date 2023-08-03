import React from 'react';
import './Paginado.css';

export default function Paginado ({breedsPerPage, allDogs, paginado}){
    //Me creo una constante llamada numero por pagina como un array vacio
    const pageNumbers = []

    for(let i = 0; i <= Math.ceil(allDogs/breedsPerPage); i++){
        pageNumbers.push(i + 1)
    }

    return(
        <nav>
            <ul className="paginado">
                {pageNumbers &&
                pageNumbers.map(number => (
                    <li className="number" key={number}>
                        <a onClick={() => paginado(number)}>{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}