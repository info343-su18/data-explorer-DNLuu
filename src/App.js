// Developed By
// Dominic Luu
// Jesse Tran
// INFO 343 - Summer 2018

import React, { Component } from 'react'
import './index.css'
import _ from 'lodash'
import'whatwg-fetch'
import { ModalPokemon } from './DetailView.js'
import { NavBar , CardRow } from './Home.js'

//-- App class --------------------------------------------------------------------------------------------------------------------------------------

class App extends Component {
  constructor(props) {
    super(props);
    // Placeholders/filler pokemon in case API call does not succeed 
    this.state = {
      pokedex: [
        {
          abilities: [],
          height:6,
          id:187,
          moves: [],
          name:"skiploom",
          species:{url: "https://pokeapi.co/api/v2/pokemon-species/188/", name: "skiploom"},
          sprites:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/188.png",
          stats:[],
          types:['water'],
          weight:10,
          evolution:[]
        },
        {
          abilities: [],
          height:6,
          id:188,
          moves: [],
          name:"skiploom",
          species:{url: "https://pokeapi.co/api/v2/pokemon-species/188/", name: "skiploom"},
          sprites:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/188.png",
          stats:[],
          types:['water'],
          weight:10,
          evolution:[]
          },
          {
          abilities: [],
          height:6,
          id:189,
          moves: [],
          name:"skiploom",
          species:{url: "https://pokeapi.co/api/v2/pokemon-species/188/", name: "skiploom"},
          sprites:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/188.png",
          stats:[],
          types:['water'],
          weight:10,
          evolution:[]
          }

      ],
      pokemon: [{
        abilities: [],
        height:6,
        id:188,
        moves: [],
        name:"skiploom",
        species:{url: "https://pokeapi.co/api/v2/pokemon-species/188/", name: "skiploom"},
        sprites:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/188.png",
        stats:[],
        types:[],
        weight:10,
        evolution:[]
      }],
      searchFilter: 'Type'
    };
    //this.componentDidMount();
  }

  // Make API calls, build up object of Pokemon data
  componentDidMount() {
    let Pokedex = require('./pokeapi-js-wrapper');
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
    for (let i = 1; i <= 151; i++) {
      let pokemonUrl = 'api/v2/pokemon/' + i
      let pokemon = {}

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
          let types = []
          response.types.forEach((type) => {
              types.push(type.type.name);
          })
          
          // create array of possible moves
          let moveSet = []
          response.moves.forEach((move) => {
              moveSet.push(move.move.name)
          })

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
              // To implement later: pokedex entry 
              // To implement later: egg group
              // To implement later: abilities
          }

          P.getPokemonSpeciesByName(pokemon.name)
          .then(function(response) {
              // console.log("speciesData");
              // console.log(response);
              pokemon.pokedexEntry = response.flavor_text_entries[50].flavor_text;
              let evolution = []
              
              // Build Pokemon's list of evolutions by name of evolution
              P.resource(response.evolution_chain.url)
              .then(function(response) {
                  evolution.push(response.chain.species.name);
                  // First evolution
                  if (response.chain.evolves_to.length > 0) {
                      evolution.push(response.chain.evolves_to[0].species.name);

                      // Second evolution if applicable
                      if (response.chain.evolves_to[0].evolves_to.length > 0) {
                          evolution.push(response.chain.evolves_to[0].evolves_to[0].species.name);
                      }
                  }
              })
              .catch((error) => {
                  console.log(error);
              });

              pokemon.evolution = evolution;
        
          })
          .catch((error) => {
              console.log(error);
          });

          // Add pokemon data to array of data
          pokeData.push(pokemon);
          this.setState({pokemon:pokeData, pokedex:pokeData});
      })
      .catch((error) => {
          console.log(error);
      })
    }
  }

  getPokemonByName(pokemonName) {
    let currPoke = this.state.pokedex;
    currPoke = _.find(currPoke, {'name': pokemonName});
    let arrayPoke = [currPoke]; 
    this.setState({pokemon:arrayPoke});
  }

  getPokemonById(id) {
    let currPoke = this.state.pokedex;
    currPoke = _.find(currPoke, {'id': id});
    let arrayPoke = [currPoke];
    this.setState({pokemon:arrayPoke});
  }

  setFilter(type) {
    let newState = this.state.searchFilter;
    newState = type;
    this.setState({searchFilter:newState});
    console.log(this.state.searchFilter);
  }

  //---------------------------------------------------------------------------------------------------------------------------------------------------
  //-------- App Render -------------------------------------------------------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------------------------------------------------------------------------

  render() {
    let filteredPokedex = this.state.pokedex.filter((pokemon) => {
      return pokemon.types.includes(this.state.searchFilter.toLowerCase());
    });
    let inputPokedex = this.state.pokedex;


    if (this.state.searchFilter === 'Type') {
      // No type selected
      inputPokedex = this.state.pokedex;
    } else {
      inputPokedex = filteredPokedex;
    }

    return (
      <div>
        <div className="jumbotron jumbotron-fluid p-0 bg-secondary">
          <div className="container text-center">
            <h1 className="display-4">PokeDex</h1>
          </div>
        </div>
        <NavBar searchFilter={this.state.searchFilter} setFilter={(type) => this.setFilter(type)} />
        <div className="container d-flex">
          <div className = "d-flex row">
            <CardRow pokedex={inputPokedex} getPokemonCallBackName={(pokemonName) => this.getPokemonByName(pokemonName)} />

            <ModalPokemon 
              pokemon={this.state.pokemon[0]} 
              pokedex={this.state.pokedex} 
              getPokemonCallBackName={(pokemonName) => this.getPokemonByName(pokemonName)}
              getPokemonCallBackID={(pokemonID) => this.getPokemonById(pokemonID)}
            />
          </div>
        </div>
      </div>
    );
  }
}

//---------------------------------------------------------------------------------------------------------------------------------------------------
export default App;
