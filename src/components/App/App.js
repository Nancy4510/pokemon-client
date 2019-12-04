import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
// import Button from 'react-bootstrap/Button'
import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import CreatePokemon from '../pokemon/CreatePokemon'
import EditPokemon from '../pokemon/EditPokemon'
import ViewAllPokemon from '../pokemon/ViewAllPokemon'
import DeletePokemon from '../pokemon/DeletePokemon'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = ({ heading, message, variant }) => {
    this.setState({ alerts: [...this.state.alerts, { heading, message, variant }] })
  }

  render () {
    const { alerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {alerts.map((alert, index) => (
          <AutoDismissAlert
            key={index}
            heading={alert.heading}
            variant={alert.variant}
            message={alert.message}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/create-pokemon' render={() => (
            <CreatePokemon alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/pokemons' render={() => (
            <ViewAllPokemon alert={this.alert}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/pokemons/:id/edit' render={() => (
            <EditPokemon alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/pokemons/:id' render={() => (
            <DeletePokemon alert={this.alert} user={user} />
          )} />
          <div className="circle">
            <div className="top-half-circle"></div>
            <div className="middle-circle"></div>
            <div className="bottom-half-circle"></div>
          </div>
        </main>
      </Fragment>
    )
  }
}

export default App
