import React, { useState } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import PokemonForm from './PokemonForm'

const CreatePokemon = props => {
  const [pokemon, setPokemon] = useState({ name: '', type: '', attack: '', weakness: '' })

  const handleChange = event => {
    event.persist()
    setPokemon({ ...pokemon, [event.target.name]: event.target.value })
  }

  const handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/pokemons`,
      method: 'POST',
      headers: {
        // express
        'Authorization': `Bearer ${props.user.token}`
      },
      data: { pokemon }
    })
      .then(res => {
        props.alert({ heading: 'Success', message: 'Pokemon Created', variant: 'success' })
        props.history.push(`pokemons/${res.data.pokemon._id}`)
      })
      .catch(console.error)
  }

  return (
    <PokemonForm
      pokemon={pokemon}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  )
}

export default CreatePokemon
