import React, { useState, useEffect, Fragment } from 'react'
// import { Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const ListOfRealPokemon = props => {
  const [pokemons, setPokemons] = useState([])

  useEffect(() => {
    axios({
      url: `https://pokeapi.co/api/v2/pokemon`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then(response => setPokemons(response.data.pokemon))
      .catch(() => props.alert({ heading: 'Oh no. Well this is embarrassing.', message: 'Couldn\'t catch the selected pokemon', variant: 'danger' }))
  }, [])

  const pokemonsJSX = pokemons.map(pokemon => (
    <ListGroup.Item
      key={pokemon._id}
      as={'a'}
      href={`#pokemons/${pokemon._id}`}
    >
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

export default ListOfRealPokemon
