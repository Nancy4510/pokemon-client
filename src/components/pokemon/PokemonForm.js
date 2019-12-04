import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const PokemonForm = (props) => {
  const { pokemon, handleChange, handleSubmit } = props
  return (
    <div className="row">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <h2>Create a Pokemon</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              placeholder="Enter your pokemon"
              value={pokemon.name}
              name="name"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="type">
            <Form.Label>Type</Form.Label>
            <Form.Control
              placeholder="Enter the type"
              value={pokemon.type}
              name="type"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="attack">
            <Form.Label>Attack</Form.Label>
            <Form.Control
              placeholder="Enter attack"
              value={pokemon.attack}
              name="attack"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="weakness">
            <Form.Label>Weakness</Form.Label>
            <Form.Control
              placeholder="Enter weakness"
              value={pokemon.weakness}
              name="weakness"
              onChange={handleChange}
            />
          </Form.Group>
          <Button type="submit" variant="primary">Submit</Button>
        </Form>
      </div>
    </div>
  )
}

export default PokemonForm
