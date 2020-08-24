import React from 'react';

import { FileProvider } from './context/fileContext';

import NavBar from './components/navBar/navbar';

import Routes from './routes';

function App() {
  return (
    <div>
      <NavBar />
      <FileProvider>
        <Routes />
      </FileProvider>
    </div>
  );
}

export default App;