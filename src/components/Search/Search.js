import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './Index.scss';

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
        <form className="row my-5 mb-2" onSubmit={(e) => props.search(e)}>
            <div className="col-12">
                <input className="form-control p-3" placeholder="Digite para buscar" list="pokemons" onChange={e => props.setSearchE(e.target.value)} type="text" />
                <datalist id="pokemons">
                {pokemons.map((pokemon) => {
                    return <option value={pokemon.name} />
                })}
                </datalist>
            </div>
            
        </form>
    )
}

export default Search;