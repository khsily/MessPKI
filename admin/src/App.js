import React, { Component } from 'react';
import loadWeb3 from "ethpki-utils/loadWeb3";
import Certificate from 'ethpki-utils';

import Admin from './pages/Admin';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cert: undefined,
    }
  }

  async componentDidMount() {
    await this.loadWeb3();
  };

  render() {
    if (!this.state.cert) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }

    return (
      <section id="app">
        <Admin cert={this.state.cert} />
      </section>
    );
  }

  async loadWeb3() {
    const web3 = await loadWeb3();
    const cert = new Certificate(web3);
    this.setState({ cert });
  }
}

export default App;
