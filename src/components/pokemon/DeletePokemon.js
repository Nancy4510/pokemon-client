import React, { useEffect, useState, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Button from 'react-bootstrap/Button'

const DeletePokemon = props => {
  const [pokemon, setPokemon] = useState(null)
  const userId = props.user._id
  console.log(userId)

  useEffect(() => {
    axios(`${apiUrl}/pokemons/${props.match.params.id}`)
      .then(response => setPokemon(response.data.pokemon))
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
        props.history.push('/pokemons')
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
      <Button href={`#pokemons/${props.match.params.id}/edit`} variant="primary" className="mr-2">Update</Button>
      {userId === pokemon.owner._id && <Button onClick={handleDelete} variant={'danger'}>Delete</Button>}
    </Fragment>
  )
}

export default withRouter(DeletePokemon)
