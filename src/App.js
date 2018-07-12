import React, { Component } from 'react';
import './index.css';
import _ from 'lodash';
import'whatwg-fetch';
import demo from './demo.png';


//---------------------------------------------------------------------------------------------------------------------------------------------------
//-- App class --------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------

class App extends Component {
  constructor(props) {
    super(props);
    // console.log(this.props.pokedex[0]);
    //this.componentDidMount();
    this.state = {
      pokedex: [{
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
      }],
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
      }]
    };
    //this.componentDidMount();
    console.log(this.state.pokemon);
  }

  componentDidMount() {
    console.log("hi");
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
    for (let i = 200; i <= 204; i++) {
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
        
          })
          .catch((error) => {
              console.log("secondError");
              console.log(error);
          });

          pokeData.push(pokemon);
          this.setState({pokemon:pokeData, pokedex:pokeData});
      })
      .catch((error) => {
          console.log(error);
      })
    }

  }

  getPokemon(pokemonName) {
    let currPoke = this.state.pokemon;
    currPoke = _.find(currPoke, {'name': pokemonName});
    this.setState({pokemon:currPoke});
  }

  getPokemonById(id) {
    let currPoke = this.state.pokemon;
    currPoke = _.find(currPoke, {'id': id});
    this.setState({pokemon:currPoke});
  }

  render() {
    // console.log("app");
    // console.log(this.props.pokedex["0"]);
    // console.log(this.props.pokedex["0"].name);
    // console.log(this.props.pokedex["0"].sprite);
    // console.log(this.props.pokedex["0"].id);

    return (
      <div className="container d-flex">
        {/* <div className = "row"> */}
          <CardRow pokedex={this.state.pokedex} />

        {/* </div> */}
          <ModalPokemon pokemon={this.state.pokemon[0]} pokedex={this.state.pokedex}/>
      </div>
    );

  }
}

class CardRow extends Component {

  render() {
    let result = [];
    for(let i = 0; i < this.props.pokedex.length; i++) {
  
      result.push(<PokemonCard pokemon={this.props.pokedex[i]} key={i} />);
    }; 

    return (
      <div className="row">
      {result}
      </div>
    );
  }
}

class PokemonCard extends Component {
  render() {
    // console.log(this.props.pokemon);

    let type = "";
    this.props.pokemon.types.forEach((t) => {
      type += " " + t; 
    });
    return (
      <div className="card mr-3 ml-3 mt-3 col-md-6" key={"pokemon: " + this.props.pokemon.name}>
        <div className="card-body d-flex justify-content-center">
          <img className="card-img-top" src={this.props.pokemon.sprite} alt={this.props.pokemon.name} />
        </div>
        <div className="card-body">
          <h3 className="card-title d-flex justify-content-center">{this.props.pokemon.name}</h3>
          <div>
           <p className="card-text d-flex justify-content-center">{type}</p>
          </div>
        </div>
      </div>
    )
  }


}


















//---------------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------
//-- Gener
//---------------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------
//-- Classes for modal/single pokemon info ----------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------

class ModalPokemon extends Component {
  componentDidMount(){
    console.log('mounted');
  }
  render() {
    console.log(this.props.pokemon);
    return (
    <section>
      <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#pokeData">
        Launch demo modal
      </button>

      <div className="modal fade" id="pokeData" tabIndex="-1" role="dialog" aria-labelledby="pokeData" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <ModalHeader pokemon={this.props.pokemon}/>

            <ModalBody pokemon={this.props.pokemon} pokedex={this.props.pokedex}/>

            <ModalFooter pokemon={this.props.pokemon} pokedex={this.props.pokedex}/>
            
          </div>
        </div>
      </div>

      

    </section>

    );
  }
}

class ModalHeader extends Component {
  componentDidMount(){
    console.log('mounted');
  }
  render() {
    return (
      <div className="modal-header">
        <p className="modalTitle h1 text-center">{this.props.pokemon.name}</p>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    );
  }
}

class ModalBody extends Component {
  componentDidMount(){
    console.log('mounted');
  }
  render() {
    return (
      <div className="modal-body">
        <div className="container-fluid">
          <div className="row">
            <div className="col col-md-6">
              
              <ModalPokemonImg pokemon={this.props.pokemon}/>
              <ModalPokemonStats pokemon={this.props.pokemon}/>
              
            </div>

            <div className="w-100 d-sm-none d-lg-none d-xl-none"></div>

            <div className="col col-md-6">

              <ModalDexEntry pokemon={this.props.pokemon}/>

              <ModalPokemonCharacteristics pokemon={this.props.pokemon}/>

              <ModalPokemonTypes pokemon={this.props.pokemon}/>

              {/* Not implemented
              <div className="mb-4">
                <p className="h4">Weaknesses</p>
                <div className="row mt-2">
                  <div className="border border-dark text-center mr-2 mb-2 rounded col-3">Type 1</div>
                  <div className="border border-dark text-center mr-2 mb-2 rounded col-3">Type 2</div>
                  <div className="border border-dark text-center mr-2 mb-2 rounded col-3">Type 3</div>
                  <div className="border border-dark text-center mr-2 mb-2 rounded col-3">Type 4</div>
                  <div className="border border-dark text-center mr-2 mb-2 rounded col-3">Type 5</div>
                </div>
              </div>
              */}

            </div>
          </div>

          <div className="mb-4"> 
            <p className="h4">Evolutions</p>
            <div className="row">
              <div className="card col">
                <img className="card-img-top mt-3" src="./demo.png" alt="Salamance" />
                <div className="card-body">
                  <p className="card-title h4">Salamance</p>
                  <p className="card-text">Dragon</p>
                </div>
              </div>

              <div className="w-100 d-sm-none d-lg-none d-xl-none"></div>

              <div className="col">
                <i className="fa fa-long-arrow-right fa-5x"></i>
              </div>

              <div className="w-100 d-sm-none d-lg-none d-xl-none"></div>

              <div className="card col">
                <img className="card-img-top mt-3" src="./demo.png" alt="Salamance" />
                <div className="card-body">
                  <p className="card-title h4">Salamance</p>
                  <p className="card-text">Dragon</p>
                </div>
              </div>

              <div className="w-100 d-sm-none d-lg-none d-xl-none"></div>

              <div className="col">
                <i className="fa fa-long-arrow-right fa-5x"></i>
              </div>

              <div className="w-100 d-sm-none d-lg-none d-xl-none"></div>

              <div className="card col">
                <img className="card-img-top mt-3" src={demo} alt="Salamance" />
                <div className="card-body">
                  <p className="card-title h4">Salamance</p>
                  <p className="card-text">Dragon</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      
    );
  }

}

class ModalPokemonImg extends Component {
  componentDidMount(){
    console.log('mounted');
  }
  render() {
    return (
      <div className="rounded mb-4">
        <img src={this.props.pokemon.sprite} alt={this.props.pokemon.name} className="img-fluid rounded"></img>
      </div>
    );
  }
}

class ModalPokemonStats extends Component {
  componentDidMount(){
    console.log('mounted');
  }
  render() {
    return (
      <div className="stats p-2 rounded mb-4">
        <p className='h3 text-center'>Stats</p>

          <ModalPokemonStatsTBody pokemon={this.props.pokemon}/>
          
      </div>
    );
  }
}

class ModalPokemonStatsTBody extends Component {
  componentDidMount(){
    console.log('mounted');
  }
  render() {
    return (
      <table cellPadding='10'>
        <ModalPokemonStatsTRows pokemon={this.props.pokemon}/>
      </table>
    );
  }
}

class ModalPokemonStatsTRows extends Component {
  componentDidMount(){
    console.log('mounted');
  }
  render() {
    console.log(this.props.pokemon);
    let statRows = Object.keys(this.props.pokemon.stats).map( (key) => {
      let setWidth = this.props.pokemon.stats[key] + "%";
      console.log(setWidth);
      let color;
      if (this.props.pokemon.stats[key] > 50) {
        color = 'green';
      } else if (this.props.pokemon.stats[key] >15) {
        color = 'yellow';
      } else {
        color = 'red';
      }
      let divBarStyle = {
        position: 'relative',
        width: setWidth,
        
      };
      return (
        <tr className="p-2">
          <th>{key}</th>
          <td className="stat-rank">{this.props.pokemon.stats[key]}</td>
          <td className="stat-bar p-0" style={divBarStyle}>
            <div className="bg-success border border-dark rounded" >
              .
            </div>
          </td>
        </tr>
      );

    });

    return (
      <tbody>
        {statRows}
      </tbody>
    );
  }
}

class ModalDexEntry extends Component {
  componentDidMount(){
    console.log('mounted');
  }
  render() {
    console.log(this.props.pokemon.pokedexEntry);
    return (
      <div className="mb-4 mt-3"> 
        <p className='dexEntry p-6'>
          {this.props.pokemon.pokedexEntry}
        </p>
      </div>
    );
  }
}

class ModalPokemonCharacteristics extends Component {
  componentDidMount(){
    console.log('mounted');
  }
  render() {
    return (
      <div className="row bg-info p-3 rounded mb-4"> 
        <div className="col-6">
          <ul className="characteristics p-0">
            <li>
              <p className="h4">Height</p>
              <p>{this.props.pokemon.height + `'`}</p>
            </li>
            <li>
              <p className="h4">Weight</p>
              <p>{this.props.pokemon.weight + "lbs"}</p>
            </li>
          </ul>
        </div>
        <div className="col-6">
          <ul className="characteristics p-0">
          {/* Not implemented
            <ModalPokemonAbilities pokemon={this.props.pokmeon}/>
          */}
          </ul>
        </div>
      </div>
    );
  }
}

class ModalPokemonAbilities extends Component {
  componentDidMount(){
    console.log('mounted');
  }
  render() {
    let abilitiesList = this.props.pokemon.abilities.map( (ability) => {
      return (
        <li>{ability}</li>
      );
    });
    return (
      <ul className="characteristics p-0">
        {abilitiesList}
      </ul>
    );
  }
}

class ModalPokemonTypes extends Component {
  componentDidMount(){
    console.log('mounted');
  }
  render() {
    let pokemonTypes = this.props.pokemon.types.map( (type) => {
      return <PokemonType type={type.name}/>
    });
    return (
      <div className="mb-4"> 
        <p className="h4">Types</p>
        <div className="row mt-2">
          {pokemonTypes}
        </div>
      </div>
    );
  }
}

class PokemonType extends Component {
  render() {
    return (
      <div className="border border-dark text-center mr-2 mb-2 rounded col-3" class={this.props.type + "Type"}>{this.props.type}</div>
    );
  }
}

class ModalFooter extends Component {
  componentDidMount(){
    console.log('mounted');
  }
  render() {
    return (
      <div className="mb-4 pl-5">
        <div className=" row justify-content-between">
          <div className="col-4">
            <button type="button" className="btn btn-secondary">Previous Pokemon</button>
          </div>
          <div className="col-4">
            <button type="button" className="btn btn-secondary">Next Pokemon</button>
          </div>
        </div>
      </div>
    );
  }
}


//---------------------------------------------------------------------------------------------------------------------------------------------------


export default App;
