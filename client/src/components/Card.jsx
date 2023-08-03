import React from 'react';

export default function Card({image, name, weightMin, weightMax, temperament}){
    //console.log(image, name);
    return(
        <div>
            <h2>Name</h2>
            <h3>{name}</h3>
            <img src={image} alt="img not found" width="200px" height="230px"/>
            <p>Temperaments</p>
            <p>{temperament}</p>
            <p>Weight</p>
            <p>{weightMin} - {weightMax} Kg</p>
        </div>
    )
}