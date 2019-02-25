import React, { Component } from 'react';
import './index.css';
import _ from 'lodash';
import'whatwg-fetch';

//---------------------------------------------------------------------------------------------------------------------------------------------------
//-- Classes for modal/single pokemon info ----------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------

export class ModalPokemon extends Component {
  componentDidMount(){
   // console.log('mounted');
  }
  render() {
    return (
    <section>

      <div className="modal fade" id="pokeData" tabIndex="-1" role="dialog" aria-labelledby="pokeData" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <ModalHeader pokemon={this.props.pokemon}/>

            <ModalBody pokemon={this.props.pokemon} pokedex={this.props.pokedex} getPokemonCallBackName={this.props.getPokemonCallBackName}/>

            <ModalFooter pokemon={this.props.pokemon} pokedex={this.props.pokedex} getPokemonCallBackID={this.props.getPokemonCallBackID}/>
          </div>
        </div>
      </div>

      

    </section>

    );
  }
}

class ModalHeader extends Component {
  componentDidMount(){
   // console.log('mounted');
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
   // console.log('mounted');
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
              <ModalPokemonWeakness pokemon={this.props.pokemon}/>
              */}


            </div>
          </div>

          <div className="mb-4"> 
            <p className="h4">Evolutions</p>
            <div className="row">


              <ModalEvolutionLayout pokemon={this.props.pokemon} pokedex={this.props.pokedex} getPokemonCallBackName={this.props.getPokemonCallBackName}/>
              
            </div>
              
          </div>

        </div>
      </div>

      
    );
  }

}

class ModalPokemonImg extends Component {
  componentDidMount(){
    // console.log('mounted');
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
   // console.log('mounted');
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
   //  console.log('mounted');
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
    // console.log('mounted');
  }
  render() {
    let statRows = Object.keys(this.props.pokemon.stats).map( (key) => {
      let setWidth = this.props.pokemon.stats[key] + "%";
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
        color: color
      };
      return (
        <tr key={key} className="p-2">
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
   // console.log('mounted');
  }
  render() {
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
    //console.log('mounted');
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

// class ModalPokemonAbilities extends Component {
//   componentDidMount(){
//     //console.log('mounted');
//   }
//   render() {
//     let abilitiesList = this.props.pokemon.abilities.map( (ability) => {
//       return (
//         <li>{ability}</li>
//       );
//     });
//     return (
//       <ul className="characteristics p-0">
//         {abilitiesList}
//       </ul>
//     );
//   }
// }

class ModalPokemonTypes extends Component {
  componentDidMount(){
   // console.log('mounted');
  }
  render() {
    let pokemonTypes = this.props.pokemon.types.map( (type) => {
      return <PokemonType key={type} type={type}/>
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

// class ModalPokemonWeakness extends Component {
//   componentDidMount(){
//     //console.log('mounted');
//   }
//   render() {
//     let pokemonTypes = this.props.pokemon.weakness.map( (type) => {
//       return <PokemonType type={type}/>
//     });
//     return (
//       <div className="mb-4"> 
//         <p className="h4">Weaknesses</p>
//         <div className="row mt-2">
//           {pokemonTypes}
//         </div>
//       </div>
//     );
//   }
// }

class ModalEvolutionLayout extends Component {
  render() {
    
    let evolutionsOutput = [];
    let evolutionList = this.props.pokemon.evolution;

    // console.log("evolution");
    // console.log(this.props.pokedex);
    if (evolutionList !== undefined) {
      for (let i = 0 ; i < evolutionList.length ; i++) {
        if (i !== 0) {
          evolutionsOutput.push(
            <div key={'split_' + i} className="w-100  d-lg-none d-xl-none"></div>
          )

          evolutionsOutput.push(
            <div key={'arrow_' + i} className="col">
              <i className="fa fa-long-arrow-right fa-5x"></i>
            </div>
          )

          evolutionsOutput.push(
            <div key={'split2_' + i} className="w-100 e d-lg-none d-xl-none"></div>
          )
        }

        let getSingleEvolutionName =  _.find(this.props.pokedex, {'name': evolutionList[i]});
        let getSingleEvolutionID =  getSingleEvolutionName.id;
        
        let singleEvolution = <ModalPokemonCard pokemon={getSingleEvolutionName} key={getSingleEvolutionID} getPokemonCallBackName={this.props.getPokemonCallBackName}/>;
        evolutionsOutput.push(singleEvolution);
        
      }
    }
    return (
      evolutionsOutput
    );
  }
}


class ModalPokemonCard extends Component {
  render() {

    let type = "";
    this.props.pokemon.types.forEach((t) => {
      type += " " + t; 
    });
    return (
      <div className="card col " 
            key={"pokemon: " + this.props.pokemon.name} 
            //data-toggle="modal" 
            onClick = { () => this.props.getPokemonCallBackName(this.props.pokemon.name)}
      >
        <p>{this.props.pokemon.id}</p>
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

class PokemonType extends Component {
  render() {
    return (
      <div className={"border border-dark text-center mr-2 ml-2 mb-2 rounded col-5 " + this.props.type + "Type"}>{this.props.type}</div>
    );
  }
}

class ModalFooter extends Component {
  componentDidMount(){
    // console.log('mounted');
  }

  render() {
    // let nextPrevPokemon = [];
    // let evolutionList = this.props.pokemon.stats;
    // if (evolutionList !== undefined) {
    //   let prevIndex = this.props.pokemon.id;
    //   let nextIndex = this.props.pokemon.id;
    //   if (prevIndex == 1) {
    //     prevIndex = 152;
    //   }
    //   if (nextIndex == 150) {
    //     nextIndex = 0;
    //   }

    //   console.log(this.props.pokemon);
    //   console.log(this.props.pokedex);
    //   console.log(prevIndex);
    //   console.log(this.props.pokedex[10]);
    //   console.log(_.find(this.props.pokedex, {'id': 151}));
      
    //   nextPrevPokemon.push((_.find(this.props.pokedex, {'id': prevIndex - 1})).name);
    //   nextPrevPokemon.push( _.find(this.props.pokedex, {'id': nextIndex + 1}).name);
    // } 
    //console.log( _.find(this.props.pokedex, {'id': this.props.pokemon.id - 1}).name);
    let prevId = this.props.pokemon.id;
    let nextId = this.props.pokemon.id;
    
    if (this.props.pokemon.id + 1 === 152) {
      nextId = 0;
    } else if (this.props.pokemon.id - 1 === 0){
      prevId = 152;

    }


    return (
      <div className="mb-4 pl-5">
        <div className=" row  justify-content-between">
          <div className="col-5 mb-3">
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick= { () => {
                if (this.props.pokemon.id - 1 === 0) {
                  this.props.getPokemonCallBackID(151);
                } else {
                  this.props.getPokemonCallBackID(this.props.pokemon.id - 1);
                }
                
              }}
            >
              {prevId -1}
            </button>
          </div>
          <div key={'split_'} className="w-100 d-sm-none d-lg-none d-xl-none"></div>
          <div className="col-5 mb-3">
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick= { () => {
                if (this.props.pokemon.id + 1 === 152) {
                  this.props.getPokemonCallBackID(1);
                } else {
                  this.props.getPokemonCallBackID(this.props.pokemon.id + 1);
                }
                
              }}
              >
              {nextId + 1}
              </button>
          </div>
        </div>
      </div> 
    );
  }
}

