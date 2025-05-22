import React, { useState } from 'react';

const PlayerForm = ({ addPlayer }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('Batsman');
  const [basePrice, setBasePrice] = useState(100);
  const [country, setCountry] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !country.trim()) return;
    
    addPlayer({
      name,
      role,
      basePrice,
      country
    });
    
    // Reset form
    setName('');
    setRole('Batsman');
    setBasePrice(100);
    setCountry('');
  };

  return (
    <form onSubmit={handleSubmit} className="player-form">
      <h3>Add New Player</h3>
      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      
      <div className="form-group">
        <label>Role:</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="Batsman">Batsman</option>
          <option value="Bowler">Bowler</option>
          <option value="All-rounder">All-rounder</option>
          <option value="Wicket-keeper">Wicket-keeper</option>
        </select>
      </div>
      
      <div className="form-group">
        <label>Base Price:</label>
        <input
          type="number"
          value={basePrice}
          onChange={(e) => setBasePrice(Number(e.target.value))}
          min="50"
          max="500"
          step="10"
          required
        />
      </div>
      
      <div className="form-group">
        <label>Country:</label>
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
      </div>
      
      <button type="submit">Add Player</button>
    </form>
  );
};

export default PlayerForm;