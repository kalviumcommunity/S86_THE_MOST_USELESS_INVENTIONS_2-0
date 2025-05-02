// src/components/InventionCard.jsx
import React from 'react';

const InventionCard = ({ invention }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem 0', borderRadius: '8px' }}>
      <h3>{invention.title}</h3>
      <p><strong>Description:</strong> {invention.description}</p>
      <p><strong>Votes:</strong> {invention.votes}</p>
    </div>
  );
};

export default InventionCard;
