// AthleteCard.js

import React from 'react';

const AthleteCard = ({ athlete }) => {
  return (
    <div className="athlete-card">
      <img src={athlete.image_url} alt={`${athlete.givenName} ${athlete.familyName}`} />
      <h2>{`${athlete.givenName} ${athlete.familyName}`}</h2>
      <p>Birth Date: {athlete.birthDate}</p>
      <p>Disciplines: {athlete.disciplines}</p>
      <p>Country: {athlete.country}</p>
      {athlete.wikipedia_url && (
        <p>
          <a href={athlete.wikipedia_url} target="_blank" rel="noopener noreferrer">
            Wikipedia
          </a>
        </p>
      )}
      {athlete.instagram_url && (
        <p>
          <a href={athlete.instagram_url} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
        </p>
      )}
    </div>
  );
};

export default AthleteCard;
