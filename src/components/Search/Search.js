import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Search = (props) =>{

    const [pokemons, setPokemons] = useState([])

    useEffect(() => {

        if(!localStorage.getItem('pokemons')){
        axios.get('https://pokeapi.co/api/v2/pokemon?limit=1118').then(response => {
            localStorage.setItem('pokemons', JSON.stringify(response.data.results));
            setPokemons(response.data.results)
         })
         }else{
            setPokemons(JSON.parse(localStorage.getItem('pokemons')));
        }
    }, [])

    return (
        <form onSubmit={(e) => props.search(e)}>
            <input list="pokemons" onChange={e => props.setSearchE(e.target.value)} type="text" />
            <datalist id="pokemons">
            {pokemons.map((pokemon) => {
                return <option value={pokemon.name} />
            })}
            </datalist>
        </form>
    )
}

export default Search;