import React, { useState, useEffect } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import PokemonForm from './PokemonForm'

const EditPokemon = props => {
  const [pokemon, setPokemon] = useState({ name: '', type: '', attack: '', weakness: '' })
  const [updated, setUpdated] = useState(false)

  useEffect(() => {
    axios({
      url: `${apiUrl}/pokemons/${props.match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then(response => setPokemon(response.data.pokemon))
      .catch(() => props.alert({ heading: 'Oh no. Well this is embarrassing.', message: 'Couldn\'t update your selected pokemon', variant: 'danger' }))
  }, [])

  const handleChange = event => {
    event.persist()
    setPokemon({ ...pokemon, [event.target.name]: event.target.value })
  }

  const handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/pokemons/${props.match.params.id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      },
      data: { pokemon }
    })
      .then(response => {
        props.alert({ heading: 'Success', message: 'You\'ve updated your pokemon', variant: 'success' })
        setUpdated(true)
        console.log('res: ', response)
      })
      .catch(() => props.alert({ heading: 'Failed', message: 'Update Failed. Try again', variant: 'danger' }))
  }

  if (updated) {
    return <Redirect to={`/pokemons/${props.match.params.id}`} />
  }

  return (
    <PokemonForm
      pokemon={pokemon}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  )
}

export default withRouter(EditPokemon)
