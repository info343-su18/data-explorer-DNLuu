import React, { Component } from 'react'

//---------------------------------------------------------------------------------------------------------------------------------------------------
//-- PokeDex Home ----------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------
export class NavBar extends Component {
    handleClick(type) {
      this.props.setFilter(type);
    }
  
    render() {
      return (
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container-fluid">
            <div className="btn-group">
              {/* <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button">
              Type
              </a> */}
              <button type = "button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
                {this.props.searchFilter}
              </button>
              <ul className="dropdown-menu">
              <li onClick={() => this.handleClick('Type')}>All</li>
                <li onClick={() => this.handleClick('Normal')}>Normal</li>
                <li onClick={() => this.handleClick('Fire')}>Fire</li>
                <li onClick={() => this.handleClick('Fighting')}>Fighting</li>
                <li onClick={() => this.handleClick('Water')}>Water</li>
                <li onClick={() => this.handleClick('Flying')}>Flying</li>
                <li onClick={() => this.handleClick('Grass')}>Grass</li>
                <li onClick={() => this.handleClick('Poison')}>Poison</li>
                <li onClick={() => this.handleClick('Electric')}>Electric</li>
                <li onClick={() => this.handleClick('Ground')}>Ground</li>
                <li onClick={() => this.handleClick('Psychic')}>Psychic</li>
                <li onClick={() => this.handleClick('Rock')}>Rock</li>
                <li onClick={() => this.handleClick('Ice')}>Ice</li>
                <li onClick={() => this.handleClick('Bug')}>Bug</li>
                <li onClick={() => this.handleClick('Dragon')}>Dragon</li>
                <li onClick={() => this.handleClick('Ghost')}>Ghost</li>
                <li onClick={() => this.handleClick('Dark')}>Dark</li>
                <li onClick={() => this.handleClick('Steel')}>Steel</li>
                <li onClick={() => this.handleClick('Fairy')}>Fairy</li>
                <li onClick={() => this.handleClick('???')}>???</li>
              </ul>
            </div>
          </div>
        </nav>
      );
    }
  }
  
  export class CardRow extends Component {
    render() {
      let result = [];
      for(let i = 0; i < this.props.pokedex.length; i++) {
    
        result.push(<PokemonCard pokemon={this.props.pokedex[i]} key={i} getPokemonCallBackName={this.props.getPokemonCallBackName}/>);
      }; 
  
      return (
        <div className="row justify-content-center">
          {result}
        </div>
      );
    }
  }
  
  class PokemonCard extends Component {
    render() {
      // console.log(this.props.pokemon);
  
      return (
        <div className="card mr-3 ml-3 mt-3 col-md-4 col-sm-6 col-xl-2" 
              key={"pokemon: " + this.props.pokemon.name} 
              data-toggle="modal" 
              data-target="#pokeData"
              onClick = { () => this.props.getPokemonCallBackName(this.props.pokemon.name)}
        >
          <p>I.D.{this.props.pokemon.id}</p>
          <div className="card-body d-flex justify-content-center">
            <img className="card-img-top" src={this.props.pokemon.sprite} alt={this.props.pokemon.name} />
          </div>
          <div className="card-body">
            <h3 className="card-title d-flex justify-content-center">{this.props.pokemon.name}</h3>
            <PokemonTypes pokemon={this.props.pokemon}/>      
          </div>
        </div>
      )
    }
  
  
  }
  
  export class PokemonTypes extends Component {
    componentDidMount(){
      //console.log('mounted');
    }
    render() {
      let pokemonTypes = this.props.pokemon.types.map( (type) => {
        return <PokemonTypeMain key={type} type={type}/>
      });
      return (
        <div className="mb-4"> 
          <p className="h4">Types</p>
          <div className="row mt-2 justify-content-center">
            {pokemonTypes}
          </div>
        </div>
      );
    }
  }
  
  class PokemonTypeMain extends Component {
    render() {
      return (
        <div className={"border border-dark text-center mr-2 ml-2 mb-2 rounded col-8 " + this.props.type + "Type"}>{this.props.type}</div>
      );
    }
  }
  
  