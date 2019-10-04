import React from 'react';
import loadWeb3 from './loadWeb3';
import PKIContract from './PKIContract';

const withContract = (Component) => {
  return class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        pkiContract: undefined,
      }
    }

    async componentDidMount() {
      await this.loadWeb3();
    };

    render() {
      if (!this.state.pkiContract) {
        return <div>Loading Web3, accounts, and contract...</div>;
      }

      return <Component pkiContract={this.state.pkiContract} />;
    }

    async loadWeb3() {
      const web3 = await loadWeb3();
      const pkiContract = new PKIContract(web3);
      this.setState({ pkiContract });
    }
  }
}

export default withContract;