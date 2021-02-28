import React from 'react';
import {useState, useEffect} from 'react';
import './Index.scss';
import Pokemon from '../Pokemon/Pokemon';
import Paginate from "../Paginate/Paginate";
import Search from "../Search/Search";
import axios from 'axios';
 

const ListPokemons = () => {

 const [pokemons, setPokemons] = useState([]);
 const [page, setPage] = useState([]);
 const [load, setLoad] = useState(true);
 const [SearchE, setSearchE] = useState('');

const updatePaginate = (url) =>{
  setPokemons([]);
  setLoad(true)
  axios.get(url).then(response => {
    setPage(response.data)
    response.data.results.map(poke => {
      axios.get(`${poke.url}`).then(response2 =>{
          setPokemons(pokemons => [...pokemons, response2.data])
        })
      }) 
      setLoad(false);
    })
  
}


const search = (e) =>{
  e.preventDefault()
  console.log(SearchE)
  axios.get(`https://pokeapi.co/api/v2/pokemon/${SearchE}`).then(response => {
     setPokemons(response.data)
    console.log(response.data)
  })
}

 useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=18').then(response => {
      setLoad(true)
      setPage(response.data)
      let promises = []
      response.data.results.map(poke => {
          promises.push(axios.get(`${poke.url}`).then(response2 =>{
            setPokemons(pokemons => [...pokemons, response2.data])
            
          }))
          
        })
        Promise.all(promises).then(()=>{
          console.log('carregados'+ pokemons);
          setLoad(false);
        }) 
      })
      
  }, [])

  return (
    <>

    <Search setSearchE={setSearchE} search={search}/>

    <section className="pokeList">
      {pokemons.length}
      {/* {load ? 'carregando...' : pokemons.sort((a, b) => a.id > b.id ? 1 : -1).map((pokemon) => {
            return <Pokemon key={pokemon.id} pokemon={pokemon} />
      })} */}
    </section>

    
  <Paginate changePokes={updatePaginate} page={page}  />
      
    </>
  )
}


export default ListPokemons;