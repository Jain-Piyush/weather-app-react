import React, { PureComponent } from 'react'
import PropTypes from "prop-types"
import {
  Router,
  Route,
  Redirect
} from 'react-router-dom'
import styled from 'styled-components'

import Config from '../../config'
import createHistory from 'history/createBrowserHistory'
import TopNavigation from '../../components/topNavigation'

import ProductRegular from '../ProductRegular/container'

import * as Phase from '../../constants/phase'

const history = createHistory()
const PUBLIC_URL = process.env.PUBLIC_URL
const PrivateRoute = ({ component, ...rest }) => {
  let user = window.localStorage.getItem("user")
  const isAuthed = (user ? true : false)
  return (
    <Route {...rest} exact
      render = {(props) => (
        isAuthed ? (
          <div>
            {React.createElement(component, props)}
          </div>
        ) :
        (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      )}
    />
  )
}
PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.func
  ]).isRequired,
  location: PropTypes.object,
   redirectURL: PropTypes.string
}

const StyledApp = styled.div`
  // Styles go here
`

class App extends PureComponent {
  static contextTypes = {
    router: PropTypes.object
  }

  render() {
    
    return (
      <Router history={history}>
        <StyledApp>
          <Route exact path="/" render={() =>
          <Redirect to="/main" />} />
          <Route path={'/main'} component={ProductRegular} />
        </StyledApp>
      </Router>
    )
  }
}
export default App
