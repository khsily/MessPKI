import React from 'react';
import { withContract } from "ethpki-utils";

import Admin from './pages/Admin';

const App = withContract(({ pkiContract }) => {
  return <Admin pkiContract={pkiContract} />;
});

export default App;
