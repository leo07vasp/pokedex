import React from "react";
import { useState, useEffect } from "react";
import "./Index.scss";
import Pokemon from "../Pokemon/Pokemon";
import Paginate from "../Paginate/Paginate";
import Search from "../Search/Search";
import axios from "axios";
import loadImage from "../../assets/pokeball.gif";

const ListPokemons = () => {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState([]);
  const [load, setLoad] = useState(true);
  const [SearchE, setSearchE] = useState("");

  const updatePaginate = (url) => {
    setPokemons([]);
    setLoad(true);
    axios.get(url).then((response) => {
      setPage(response.data);
      response.data.results.map((poke) => {
        return axios.get(`${poke.url}`).then((response2) => {
          setPokemons((pokemons) => [...pokemons, response2.data]);
        });
      });
      setLoad(false);
    });
  };

  const search = (e) => {
    e.preventDefault();
    if (SearchE) {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${SearchE}`)
        .then((response) => {
          setPokemons(response.data);
          console.log(response.data);
        });
    } else {
      renderPokeStart();
    }
  };

  const renderPokeStart = () => {
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=8").then((response) => {
      setLoad(true);
      setPage(response.data);
      setPokemons([]);
      let promises = [];
      response.data.results.map((poke) => {
        return promises.push(
          axios.get(`${poke.url}`).then((response2) => {
            setPokemons((pokemons) => [...pokemons, response2.data]);
          })
        );
      });
      Promise.all(promises).then(() => {
        console.log("carregados" + pokemons);
        setLoad(false);
      });
    });
  };

  useEffect(() => {
    renderPokeStart();
  }, []);

  return (
    <>
      <Search setSearchE={setSearchE} search={search} />

      <section className="p-sm-10">
        <div className="row base-list">
          {load ? (
            <img src={loadImage} />
          ) : Array.isArray(pokemons) && pokemons.length > 1 ? (
            pokemons
              .sort((a, b) => (a.id > b.id ? 1 : -1))
              .map((pokemon) => {
                return <Pokemon key={pokemon.id} pokemon={pokemon} />;
              })
          ) : (
            <Pokemon key={pokemons.id} pokemon={pokemons} />
          )}
        </div>
      </section>

      <Paginate changePokes={updatePaginate} page={page} />
    </>
  );
};

export default ListPokemons;
