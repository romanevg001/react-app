import React, { Component, Fragment } from 'react';
import Container from 'react-bootstrap/Container';

import Header from '../Header/Header';

export default class Layout extends Component {

    render () {
        console.log(this.props)
        return (
          <Fragment>
              <Header />
              <Container fluid>
                  {this.props.children}
              </Container>
          </Fragment>
        )
    }
}
