import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';



<<<<<<< HEAD
ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();
=======



let Pokedex = require('pokeapi-js-wrapper');

let options = {
    protocol: 'https',
    versionPath: '/api/v2/',
    cache: true,
    timeout: 120 * 1000 // 5s
  }

let P = new Pokedex.Pokedex(options);


// pokeData represents data for all pokemon to be representated in pokedex
let pokeData = [];

// change for loop indexes to select which pokemon to include by ID
// i.e. 1-151 for the original 151 pokemon
for (let i = 188; i <= 188; i++) {
    let pokemonUrl = 'api/v2/pokemon/' + i;
    let pokemon = {};

    // P.resource(pokemonUrl)
    P.resource(pokemonUrl)
    .then((response) => {
        // console.log("response");
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
        pokemon = {
            name: response.name,
            id: i,
            stats: baseStats,
            types: types,
            height: response.height,
            weight: response.weight,
            moves: moveSet,
            sprite: response.sprites.front_default
            // pokedex entry 
            // egg group
            // abilities
        }

        P.getPokemonSpeciesByName(pokemon.name)
        .then(function(response) {
            // console.log("speciesData");
            // console.log(response);
            pokemon.evolution = response.evolution_chain.url;
            pokemon.pokedexEntry = response.flavor_text_entries[50].flavor_text;
            let evolution = [];
            
            P.resource(pokemon.evolution)
            .then(function(response) {
                evolution.push(response.chain.species.name);
                if (response.chain.evolves_to.length > 0) {
                    evolution.push(response.chain.evolves_to[0].species.name);

                    if (response.chain.evolves_to[0].evolves_to.length > 0) {
                        evolution.push(response.chain.evolves_to[0].evolves_to[0].species.name);
                    }
                }


            })
            .catch((error) => {
                console.log("thirdError");
                console.log(error);
            });

            pokemon.evolution = evolution;

      console.log(typeof pokeData);

        })
        .catch((error) => {
            console.log("secondError");
            console.log(error);
        });

        pokeData.push(pokemon);
        render();
    })
    .catch((error) => {
        console.log(error);
    })
}

function render() {
    ReactDOM.render(<App pokedex={pokeData}/>, document.getElementById('root'));
    registerServiceWorker();
}
>>>>>>> e487af59aa5b4b1cfc4a5b20d13e6366e1789d9a
