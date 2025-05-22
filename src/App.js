import './App.css';
import React from 'react';
import { AuctionProvider } from './contexts/AuctionContext';
import AppMain from './AppMain';

function App() {
  return (
     <AuctionProvider>
      <AppMain />
    </AuctionProvider>
  );
}

export default App;
