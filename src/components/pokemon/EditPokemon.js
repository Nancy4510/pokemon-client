import React, { useState, useEffect } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import PokemonForm from './PokemonForm'

const EditPokemon = props => {
  const [pokemon, setPokemon] = useState({ name: '', type: '', attack: '', weakness: '' })
  const [updated, setUpdated] = useState(false)

  useEffect(() => {
    axios(`${apiUrl}/pokemons/${props.match.params.id}`)
      .then(res => setPokemon(res.data.pokemon))
      .catch(console.error)
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
        props.alert({ heading: 'Success', message: 'You updated your pokemon', variant: 'success' })
        setUpdated(true)
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
