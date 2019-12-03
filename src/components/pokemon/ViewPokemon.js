import React, { useState, useEffect, Fragment } from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const ViewPokemon = props => {
  const [pokemons, setPokemons] = useState([])

  useEffect(() => {
    axios(`${apiUrl}/pokemons`)
      .then(res => {
        setPokemons(res.data.pokemons)
      })

      .then(() => props.alert({ heading: 'Success', message: 'Here are all your Pokemon', variant: 'success' }))
      .catch(console.error)
  }, []) // dependencies array

  const pokemonsJSX = pokemons.map(pokemon => (
    <ListGroup.Item
      key={pokemon._id} as={'a'} href={`#pokemons/${pokemon._id}`}>
      {pokemon.name}
    </ListGroup.Item>
  ))

  return (
    <Fragment>
      <h1>Pokemon</h1>
      <ListGroup>
        {pokemonsJSX}
      </ListGroup>
    </Fragment>
  )
}

export default ViewPokemon
