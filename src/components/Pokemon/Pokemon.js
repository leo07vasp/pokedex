import React from "react";
import "./Index.scss";

const replaceImageSrc = (e, newSrc) => {
  e.target.src = process.env.PUBLIC_URL + newSrc;
};

const toggleActiveClass = (e) => {
  console.log(e.target);
  e.target.closest("span").querySelector(".card").classList.toggle("active");
  // e.target.closest("card").classList.toggle('active')
};

const Pokemon = (props) => {
  return (
    <span className="p-4 col-lg-3 col-md-6 col-sm-1 content-poke">
      <div
        onClick={(e) => toggleActiveClass(e)}
        key={`pk-${props.pokemon.id}`}
        className={`poke front rounded-3 card ${
          props.pokemon.types && props.pokemon.types[0].type.name
        }`}
      >
        <div className="front">
          {" "}
          {/* <h2 className="mb-3">{props.pokemon.id}</h2> */}
          <h5 className="card-header">#{props.pokemon.id}</h5>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${props.pokemon.id}.png`}
            onError={(e) =>
              replaceImageSrc(e, `/pokemons/name/${props.pokemon.name}.png`)
            }
          />
          {/* <img src={`https://pokeres.bastionbot.org/images/pokemon/${props.pokemon.id}.png`}  onError={(e) => replaceImageSrc(e, `${props.pokemon.sprites.other.front_default}`)} /> */}
          {/* <img src={`${process.env.PUBLIC_URL}/pokemons/name/${props.pokemon.name}.png`} /> */}
          <div className="card-body">
            <h4 className="card-title">{props.pokemon.name}</h4>
            <div className="row">
              {Array.isArray(props.pokemon.types) &&
                props.pokemon.types.map((type) => {
                  return (
                    <div
                      className={`badge rounded-pill bg-secondary col m-2 ${type.type.name}`}
                    >
                      {type.type.name}
                    </div>
                  );
                })}
            </div>


          </div>
        </div>
        <div className="back">
        <div className="mb-3 col-10">
              {Array.isArray(props.pokemon.stats) &&
                props.pokemon.stats.map((stat) => {
                  return (
                    <>
                      <p className="m-0 mt-2 text-start">{stat.stat.name}</p>
                      <div className="progress" style={{ height: "1px" }}>
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: `${stat.base_stat}%` }}
                          aria-valuenow={stat.base_stat}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </>
                  );
                })}
            </div>
          <h6>Habilidades</h6>
          <ul className="list-group col-10">
          {Array.isArray(props.pokemon.abilities) &&
            props.pokemon.abilities.map((abilitie, ) => {
              return (
                <>
                 <li className="list-group-item">
                    {abilitie.ability.name}
                  </li>
                </>
              );
            })}
            </ul>
            <h6 className="mt-3">Medidas</h6>
            <ul className="list-group col-10">
          <li className="list-group-item"><b>Height : </b> {props.pokemon.height}</li>
          <li className="list-group-item"><b>Weight : </b> {props.pokemon.weight}</li>
          </ul>
          
        </div>
      </div>
    </span>
  );
};

export default Pokemon;
