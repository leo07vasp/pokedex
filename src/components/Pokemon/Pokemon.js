import React from 'react';
import './Index.scss';


const Pokemon = (props) => {
  return <div key={`pk-${props.pokemon.id}`} className={`poke shadow  ${props.pokemon.types && props.pokemon.types[0].type.name }`}>
      <h2>{props.pokemon.id}</h2>
      <img src={`${process.env.PUBLIC_URL}/pokemons/name/${props.pokemon.name}.png`} />
      <h4>{props.pokemon.name}</h4>
      <ul>
        {Array.isArray(props.pokemon.types) && props.pokemon.types.map(type => {
            return <li>{type.type.name}</li>
        })}
      </ul>
      
  </div>
};


export default Pokemon;