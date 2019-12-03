import React, { useEffect, useState, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Button from 'react-bootstrap/Button'

const DeletePokemon = props => {
  const [pokemon, setPokemon] = useState(null)
  const userId = props.user._id

  useEffect(() => {
    axios(`${apiUrl}/pokemons/${props.match.params.id}`)
      .then(res => setPokemon(res.data.pokemon))
      .catch(() => props.alert({ heading: 'That didn\'t work', message: 'Couldn\'t retrieve the requested pokemon', variant: 'danger' }))
  }, [])

  const handleDelete = event => {
    axios({
      url: `${apiUrl}/pokemons/${props.match.params.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then(() => {
        props.alert({ heading: 'Success', message: 'You deleted your pokemon', variant: 'warning' })
        props.history.push('/')
      })
      .catch(() => {
        props.alert({ heading: 'Failed', message: 'Could not delete your pokemon', variant: 'danger' })
      })
  }

  if (!pokemon) {
    return <p>Catching pokemon for you...</p>
  }

  return (
    <Fragment>
      <h1>Pokemon</h1>
      <h2>{pokemon.name}</h2>
      {userId === pokemon.owner._id && <Button onClick={handleDelete} variant={'danger'}>Delete</Button>}
    </Fragment>
  )
}

export default withRouter(DeletePokemon)
