import React, { Fragment } from 'react'
import Button from 'react-bootstrap/Button'

const PokemonForm = (props) => {
  const { pokemon, handleChange, handleSubmit } = props
  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <h2>Create a Pokemon</h2>
        <input
          id="name"
          placeholder="name of pokemon"
          value= {pokemon.name}
          name="name"
          required
          onChange={handleChange}
        />
        <input
          id="type"
          placeholder="type of pokemon"
          value= {pokemon.type}
          name="type"
          required
          onChange={handleChange}
        />
        <input
          id="attack"
          placeholder="name of attack for the pokemon"
          value= {pokemon.attack}
          name="attack"
          required
          onChange={handleChange}
        />
        <input
          id="weakness"
          placeholder="name of weakness for the pokemon"
          value= {pokemon.weakness}
          name="weakness"
          required
          onChange={handleChange}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </Fragment>
  )
}

export default PokemonForm
