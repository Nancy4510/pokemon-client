import React, { useState, useEffect, Fragment } from 'react'
// import { Link } from 'react-router-dom'
// import ListGroup from 'react-bootstrap/ListGroup'
import axios from 'axios'
// import apiUrl from '../../apiConfig'

const ListOfRealPokemon = props => {
  const [realpokemons, setRealPokemons] = useState('https://pokeapi.co/api/v2/pokemon/')

  useEffect(() => {
    axios('https://pokeapi.co/api/v2/pokemon/')
      .then(response => setRealPokemons(response.data))
      .catch(() => props.alert({ heading: 'Oh no. Well this is embarrassing.', message: 'Couldn\'t catch all pokemon', variant: 'danger' }))
  }, [])

  return (
    <Fragment>
      <h1>Pokemon</h1>
      {realpokemons}
    </Fragment>
  )
}

export default ListOfRealPokemon
