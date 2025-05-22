import './App.css';
import React from 'react';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { AuctionProvider } from './contexts/AuctionContext';
import AppMain from './AppMain';

function App() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (isProduction) {
   
    return (
      <BrowserRouter basename="/ipl-auction">
        <AuctionProvider>
          <AppMain />
        </AuctionProvider>
      </BrowserRouter>
    );
  } else {
    
    return (
      <HashRouter>
        <AuctionProvider>
          <AppMain />
        </AuctionProvider>
      </HashRouter>
    );
  }
}

export default App;

