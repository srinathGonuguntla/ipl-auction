/* import './App.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuctionProvider } from './contexts/AuctionContext';
import AppMain from './AppMain';

function App() {
  return (
     <BrowserRouter basename="/ipl-auction">
      <AuctionProvider>
        <AppMain />
      </AuctionProvider>
    </BrowserRouter>
  );
}

export default App;
 */


import './App.css';
import React from 'react';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { AuctionProvider } from './contexts/AuctionContext';
import AppMain from './AppMain';

function App() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (isProduction) {
    // For GitHub Pages deployment
    return (
      <BrowserRouter basename="/ipl-auction">
        <AuctionProvider>
          <AppMain />
        </AuctionProvider>
      </BrowserRouter>
    );
  } else {
    // For local development
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

