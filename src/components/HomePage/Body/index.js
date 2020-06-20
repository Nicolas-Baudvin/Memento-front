import React from 'react';

export default () => {
  return (
    <div className="homePage-body">
      <div className="homePage-body-block">
        <div className="homePage-body-block-title">
          <h1><strong>Soyez Agile !</strong></h1>
          <h2><strong>My Memento</strong> vous aide dans votre organisation quotidienne ou professionnelle.</h2>
        </div>
      </div>
      <div className="homePage-body-block">
        <img src="/assets/listes.png" alt="exemple de liste" />
        <div className="homePage-body-svg">
          <svg viewBox="0 0 100 100" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
            <circle fill="#6E00C8" cx="85" cy="70" r="50" />
          </svg>
        </div>
      </div>

    </div>
  );
};
