import React, { PureComponent } from 'react'
import PropTypes from "prop-types"
import styled from 'styled-components'

const HeaderFixed = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1030;
`

export default class TopNavigation extends React.Component {

  render() {

    return (

      <HeaderFixed>
        Header  
      </HeaderFixed>

    );
  }
}
