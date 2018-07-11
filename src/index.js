import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// import $ from 'pokedex-promise-v2';






let Pokedex = require('pokeapi-js-wrapper');

let options = {
    protocol: 'https',
    versionPath: '/api/v2/',
    cache: true,
    timeout: 60 * 1000 // 5s
  }

let P = new Pokedex.Pokedex(options);


// pokeData represents data for all pokemon to be representated in pokedex
let pokeData = [];


// change for loop indexes to select which pokemon to include by ID
// i.e. 1-151 for the original 151 pokemon
for (let i = 188; i <= 188; i++) {
    let pokemonUrl = 'api/v2/pokemon/' + i;

    P.resource(pokemonUrl)
    .then((response) => {
        let promise = response;

        // console.log(response);

        // create object of base stats
        let baseStats = {
            "speed": response.stats[0].base_stat,
            "special-defense": response.stats[1].base_stat,
            "special-attack": response.stats[2].base_stat,
            "defense": response.stats[3].base_stat,
            "attack": response.stats[4].base_stat,
            "hp": response.stats[5].base_stat
        }

        // create array of types
        let types = [];
        response.types.forEach((type) => {
            types.push(type.type.name);
        });
        
        // create array of possible moves, maybe make this an object?
        let moveSet = [];
        response.moves.forEach((move) => {
            moveSet.push(move.move.name);
        });

        // create object representing pokemon with information
        let pokemon = {
            name: response.name,
            id: i,
            stats: baseStats,
            types: types,
            height: response.height,
            weight: response.weight,
            moves: moveSet,
            sprite: response.sprites.front_default
        }
        pokeData.push(pokemon);
        
        return promise;
    })
    .catch((error) => {
        console.log(error);
    })

    /*
     let pokemon = {
         name: pokeData.name,
         id: i,
         stats: pokeData.stats,
         type: pokeData.types['0'].type.name,
         height: pokeData.height,
         sprite: pokeData.sprites.front_default
     }
     pokeArray.push(pokemon);
     */
}

 console.log(pokeData);

ReactDOM.render(<App pokedex={pokeData}/>, document.getElementById('root'));
registerServiceWorker();