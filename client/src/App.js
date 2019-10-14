import React from 'react';
import { withContract } from "ethpki-utils";

import Client from './pages/Client';

const App = withContract(({ pkiContract }) => {
  return <Client pkiContract={pkiContract} />;
});

export default App;
