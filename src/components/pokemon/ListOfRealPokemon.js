import React, { useState, useEffect, Fragment } from 'react'
// import { Link } from 'react-router-dom'
// import ListGroup from 'react-bootstrap/ListGroup'
import axios from 'axios'
// import apiUrl from '../../apiConfig'

const ListOfRealPokemon = props => {
  const [imagepokemons, setImagePokemons] = useState([])

  useEffect(() => {
    getImages()
  }, [])

  const getImages = () => {
    axios('https://pokeapi.co/api/v2/pokemon/')
      .then(response => setImagePokemons(response.data))
      .catch(() => props.alert({ heading: 'Oh no. Well this is embarrassing.', message: 'Couldn\'t catch all pokemon', variant: 'danger' }))
  }

  return (
    <Fragment>
      <h1>Pokemon</h1>
      {imagepokemons}
      <img src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + '.png'} className="sprite" />
    </Fragment>
  )
}

export default ListOfRealPokemon
