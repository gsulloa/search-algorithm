import React, { Component } from 'react';
import Solver from './components/Solver';
import { connect, Provider } from 'react-redux';
class App extends Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <Solver/>
      </Provider>
    );
  }
}

export default connect()(App);
