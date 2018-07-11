import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// import $ from 'pokedex-promise-v2';




let POKEMON_LIST = [];
for (let i = 1; i <= 151; i++) {
    POKEMON_LIST[i] = i;
}

let Pokedex = require('pokeapi-js-wrapper');

let options = {
    protocol: 'https',
    versionPath: '/api/v2/',
    cache: true,
    timeout: 5000 * 1000 // 5s
  }

let P = new Pokedex.Pokedex(options);


let pokeArray = [];
for (let i = 1; i <= 85; i++) {
    let pokemonUrl = 'api/v2/pokemon/' + i;

    let pokeData = P.resource(pokemonUrl)
    .then((response) => {
        let promise = response;
        // console.log(response);
        // console.log(response.name);
        // console.log(response.stats);
        // console.log(response.types[0]);
        // console.log(response.height);
        // console.log(response.sprites.front_default);
        
        let pokemon = {
            name: response.name,
            id: i,
            stats: response.stats,
            type: response.types['0'].type.name,
            height: response.height,
            sprite: response.sprites.front_default
        }
        pokeArray.push(pokemon);
        
        return promise;
    })
    .catch((error) => {
        console.log(error);
    })



    // let pokemon = {
    //     name: pokeData.name,
    //     id: i,
    //     stats: pokeData.stats,
    //     type: pokeData.types['0'].type.name,
    //     height: pokeData.height,
    //     sprite: pokeData.sprites.front_default
    // }
    // pokeArray.push(pokemon);
}
console.log(pokeArray);



// let x = fetch("https://pokeapi.com/api/v2/pokemon/155")
//     .then((response) => {
//         let promise = response.json(); 

//         return promise;
//     })
//     .catch((error) => {
//         console.log(error);
//     })




ReactDOM.render(<App pokedex={POKEMON_LIST}/>, document.getElementById('root'));
registerServiceWorker();