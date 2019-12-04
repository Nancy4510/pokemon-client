import React, { useState, useEffect, Fragment } from 'react'
// import { Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const ViewAllPokemon = props => {
  const [pokemons, setPokemons] = useState([])

  useEffect(() => {
    axios(`${apiUrl}/pokemons`)
      .then(response => {
        setPokemons(response.data.pokemons)
      })

      .then(() => props.alert({ heading: 'Success', message: 'Here are all your Pokémon', variant: 'success' }))
      .catch(console.error)
  }, []) // dependencies array

  const pokemonsJSX = pokemons.map(pokemon => (
    <ListGroup.Item
      key={pokemon._id}
      action
      href={`#pokemons/${pokemon._id}`}
    >
      {pokemon.name}
    </ListGroup.Item>
  ))

  return (
    <Fragment>
      <h1>Pokémon</h1>
      <ListGroup>
        {pokemonsJSX}
      </ListGroup>
    </Fragment>
  )
}

export default ViewAllPokemon
