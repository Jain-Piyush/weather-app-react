import React, { PureComponent } from 'react'
import PropTypes from "prop-types"
import styled from 'styled-components'

const FooterFixed = styled.div`
  margin-top: 100px;
`

export default class ProductGridFooter extends React.Component {

  render() {
    
    return (
        <FooterFixed>
        <div className="footerbottom-2">
          <div className="container">
            <div className="footerbottomsecond w-row">
              <div className="footercolumn w-col w-col-2 w-col-medium-4 w-col-small-4 w-col-tiny-tiny-stack"><img src="/img/dispatch-footer-logo.svg" width="134" className="footerlogo"/></div>
              <div className="footercolumn w-col w-col-2 w-col-medium-4 w-col-small-4 w-col-tiny-tiny-stack">
                <div className="footertitle">Our Products</div><a  className="footerlink">Build a plan</a><a className="footerlink">Coffee</a><a  className="footerlink">Equipment</a></div>
              <div className="footercolumn w-col w-col-2 w-col-medium-4 w-col-small-4 w-col-tiny-tiny-stack">
                <div className="footertitle">About us</div><a  className="footerlink">Worldview</a><a  className="footerlink">Services</a><a  className="footerlink">Stores</a></div>
              <div className="footercolumn w-col w-col-2 w-col-medium-4 w-col-small-4 w-col-tiny-tiny-stack">
                <div className="footertitle">Help</div><a  className="footerlink">FAQ</a><a  className="footerlink">My Account</a></div>
              <div className="footercolumn w-col w-col-2 w-col-medium-4 w-col-small-4 w-col-tiny-tiny-stack">
                <div className="footertitle">Learn</div><a  className="footerlink">Brewing</a><a  className="footerlink">Events</a></div>
              <div className="w-col w-col-2 w-col-medium-4 w-col-small-4 w-col-tiny-tiny-stack">
                <div className="footertitle">Social</div><a  className="footerlink">Facebook</a><a  className="footerlink">Instagram</a></div>
            </div>
          </div>
        </div>
        </FooterFixed>
    );
  }
}