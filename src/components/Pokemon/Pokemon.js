import React from 'react';
import './Index.scss';


const Pokemon = (props) => {
  return (
    <div className="p-4 col-lg-3 col-md-6 col-sm-1">
      <div key={`pk-${props.pokemon.id}`} className={`poke rounded-3 card ${props.pokemon.types && props.pokemon.types[0].type.name }`}>
          {/* <h2 className="mb-3">{props.pokemon.id}</h2> */}
          {/* <img src={`${process.env.PUBLIC_URL}/pokemons/name/${props.pokemon.name}.png`} /> */}
          <h5 class="card-header">
          #{props.pokemon.id}
        </h5>
          <img src={`https://pokeres.bastionbot.org/images/pokemon/${props.pokemon.id}.png`} />
          <div className="card-body">
              <h4 className="card-title">{props.pokemon.name}</h4>
              <div className="row">
                  {Array.isArray(props.pokemon.types) && props.pokemon.types.map(type => {
                    return <span className={`badge rounded-pill bg-secondary col m-2 ${type.type.name}`}>{type.type.name}</span>
                })}
            </div>

            <div >
              {Array.isArray(props.pokemon.stats) && props.pokemon.stats.map(stat => {
                      return (
                          <>
                          <p className="m-0 mt-2 text-start">{stat.stat.name}</p>
                          <div class="progress" style={{height: '2px'}}>
                            <div class="progress-bar" role="progressbar" style={{width: `${stat.base_stat}%`}} aria-valuenow={stat.base_stat} aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                          </>
                      )
              })}
            </div>

          </div>
          
          
           
          
          
      </div>
  </div>
  )
};


export default Pokemon;