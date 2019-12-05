import React, { useState, useEffect, Fragment } from 'react'
// import { Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'
import Table from 'react-bootstrap/Table'
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
  //   <ListGroup.Item
  //     key={pokemon._id}
  //     action
  //     href={`#pokemons/${pokemon._id}`}
  //   >
  //     Pokémon Name: {pokemon.name}
  //   </ListGroup.Item>
  // ))

    <Table striped bordered hover variant="dark"
      key={pokemon._id}
      action = 'true'
      href={`#pokemons/${pokemon._id}`}
    >
      <thead>
        <tr>
          <th>Pokémon Name</th>
          <th>Type</th>
          <th>Pokémon ID</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td> <a className='pokemon-name-link' href={`#pokemons/${pokemon._id}`}>{pokemon.name}</a></td>
          <td>{pokemon.type}</td>
          <td>{pokemon._id}</td>
        </tr>
      </tbody>
    </Table>
  ))

  return (
    <Fragment>
      <h1>Pokémon</h1>
      <h3>To view more information about your pokémon, just click on its name!</h3>
      <ListGroup>
        {pokemonsJSX}
      </ListGroup>
    </Fragment>
  )
}

export default ViewAllPokemon
