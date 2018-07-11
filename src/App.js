import React, { Component } from 'react';
import './index.css';
import _ from 'lodash';

//---------------------------------------------------------------------------------------------------------------------------------------------------
//-- App class --------------------------------------------------------------------------------------------------------------------------------------

class App extends Component {
  constructor(props) {
    super(props);
    console.log(props.pokedex);
    this.state = {
      pokedex: this.props.pokedex,
      pokemon: this.props.pokedex
    }
  }

  getPokemon(pokemonName) {
    let currPoke = this.state.pokemon;
    currPoke = _.find(currPoke, {'name': pokemonName});
    this.setState({pokemon:currPoke});
  }

  render() {
    return (
      <div>
        <ModalPokemon pokemon={this.state.pokemon[0]} pokedex={this.state.pokedex}/>
      </div>
    );
  }
}

//-- Gener


//---------------------------------------------------------------------------------------------------------------------------------------------------
//-- Classes for modal/single pokemon info ----------------------------------------------------------------------------------------------------------

class ModalPokemon extends Component {
  render() {
    console.log(this.props.pokemon.evolution);
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

              

              <div className="mb-4"> 
                <p className="h4">Types</p>
                <div className="row mt-2">
                  <div className="border border-dark text-center mr-2 mb-2 rounded col-3">Type 1</div>
                  <div className="border border-dark text-center mr-2 mb-2 rounded col-3">Type 2</div>
                </div>
              </div>

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
                <img className="card-img-top mt-3" src="./demo.png" alt="Salamance" />
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
  render() {
    return (
      <div className="rounded mb-4">
        <img src={this.props.pokemon.sprite} alt={this.props.pokemon.name} className="img-fluid rounded"></img>
      </div>
    );
  }
}

class ModalPokemonStats extends Component {
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
  render() {
    return (
      <table cellPadding='10'>
        <ModalPokemonStatsTRows pokemon={this.props.pokemon}/>
      </table>
    );
  }
}

class ModalPokemonStatsTRows extends Component {
  render() {
  //   let statRows = Object.keys(this.props.pokemon.stats).map( (key) => {
  //     let setWidth = this.props.pokemon.stats[key] + "%";
  //     let color;
  //     if (this.props.pokemon.stats[key] > 50) {
  //       color = 'green';
  //     } else if (this.props.pokemon.stats[key] >15) {
  //       color = 'yellow';
  //     } else {
  //       color = 'red';
  //     }
  //     let divBarStyle = {
  //       position: 'relative',
  //       width: setWidth,
  //       color: color
  //     };
  //     return (
  //       <tr className="p-2">
  //         <th>{key}</th>
  //         <td className="stat-rank">{this.props.pokemon.stats[key]}</td>
  //         <td className="stat-bar p-0">
  //           <div className="bg-success border border-dark rounded" style={divBarStyle}>
  //             .
  //           </div>
  //         </td>
  //       </tr>
  //     );

  //   });

    return (
      null
      // <tbody>
      //   {statRows}
      // </tbody>
    );
  }
}

class ModalDexEntry extends Component {
  render() {
    return (
      <div className="mb-4 mt-3"> 
        <p className='dexEntry p-6'>
          {this.props.pokemon.dexEntry}
        </p>
      </div>
    );
  }
}

class ModalPokemonCharacteristics extends Component {
  render() {
    return (
      <div className="row bg-info p-3 rounded mb-4"> 
        <div className="col-6">
          <ul className="characteristics p-0">
            <li>
              <p className="h4">Height</p>
              <p>{this.props.pokemon.height}</p>
            </li>
            <li>
              <p className="h4">Weight</p>
              <p>{this.props.pokemon.height + "lbs"}</p>
            </li>
          </ul>
        </div>
        <div className="col-6">
          <ul className="characteristics p-0">
            
          </ul>
        </div>
      </div>
    );
  }
}

class ModalPokemonAbilities extends Component {
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
  render() {
    return (
      <div className="mb-4"> 
        <p className="h4">Types</p>
        <div className="row mt-2">
          <div className="border border-dark text-center mr-2 mb-2 rounded col-3">Type 1</div>
          <div className="border border-dark text-center mr-2 mb-2 rounded col-3">Type 2</div>
        </div>
      </div>
    );
  }
}

class ModalFooter extends Component {
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
