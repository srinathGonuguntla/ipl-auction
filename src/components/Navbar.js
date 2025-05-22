import React from 'react';

const Navbar = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="navbar">
      <button 
        className={activeTab === 'players' ? 'active' : ''}
        onClick={() => setActiveTab('players')}
      >
        Players
      </button>
      <button 
        className={activeTab === 'teams' ? 'active' : ''}
        onClick={() => setActiveTab('teams')}
      >
        Teams
      </button>
      <button 
        className={activeTab === 'auction' ? 'active' : ''}
        onClick={() => setActiveTab('auction')}
        disabled={!activeTab}
      >
        Auction
      </button>
    </nav>
  );
};

export default Navbar;