import React, { useEffect, useState, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Button from 'react-bootstrap/Button'

const ViewOnePokemon = props => {
  const [pokemon, setPokemon] = useState(null)
  const userId = props.user._id
  console.log('user id: ', userId)

  useEffect(() => {
    axios({
      url: `${apiUrl}/pokemons/${props.match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then(response => setPokemon(response.data.pokemon))
      .catch(() => props.alert({ heading: 'Oh no. Well this is embarrassing.', message: 'Couldn\'t catch the selected pokemon', variant: 'danger' }))
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
    // <Fragment>
    //   <h1>Pokemon</h1>
    //   <h2>{pokemon.name}</h2>
    //   <Button href={`#pokemons/${props.match.params.id}/edit`} variant="primary" className="mr-2">Update</Button>
    //   {userId === pokemon.owner._id && <Button onClick={handleDelete} variant={'danger'}>Delete</Button>}
    // </Fragment>
    <div className="row">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <h2>{pokemon.name}</h2>
        {userId === pokemon.owner && (
          <Fragment>
            <Button href={`#pokemons/${props.match.params.id}/edit`} variant="primary" className="mr-2">Update</Button>
            <Button onClick={handleDelete} variant="danger" className="mr-2">Delete</Button>
          </Fragment>
        )}
        <Button href="#/pokemons" variant="secondary">Back</Button>
      </div>
    </div>
  )
}

export default withRouter(ViewOnePokemon)
