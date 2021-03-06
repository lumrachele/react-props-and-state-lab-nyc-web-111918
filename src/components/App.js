import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (e) =>{
    this.setState({
      filters: {type: e.target.value}
    })
  }

  onFindPetsClick = (e) =>{
    //should fetch
    // if there's a query parameter, add ?type=${this.state.filters.type}
    if (this.state.filters.type === 'all') {
      fetch(`/api/pets`)
      .then((pets)=>{
        return pets.json()
      })
      .then(pets=>{
        this.setState({
          pets: [...pets]
        })
      })
    } else if (this.state.filters.type !== 'all'){
      fetch(`/api/pets?type=${this.state.filters.type}`)
      .then((selectedPets) => {
        return selectedPets.json()
      })
      .then((selectedPets) => {
        this.setState({
          pets: [...selectedPets]
        })
      })
    }
  }


    onAdoptPet = (petId) =>{
      const pets = this.state.pets.map((pet)=>{
        if(pet.id === petId){
          return {...pet,
            isAdopted: true
          }
        } else{
          return pet
          }
      })
      this.setState({
        pets: pets
      })
    }


  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
              onChangeType={this.onChangeType}
              onFindPetsClick={this.onFindPetsClick}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser
                pets={this.state.pets} onAdoptPet={this.onAdoptPet}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
