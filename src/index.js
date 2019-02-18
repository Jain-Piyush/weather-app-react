import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'

import store from './store'
import AppContainer from './views/App/container'
// import Login from './views/Login/container'
import './index.scss'

const ctaColor = '#E74360'
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: ctaColor
  },
  fontFamily: '"Roboto", sans-serif !important'
})

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

ReactDOM.render(
    <MuiThemeProvider muiTheme={muiTheme}>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </MuiThemeProvider>,
    document.getElementById('root')
  )
