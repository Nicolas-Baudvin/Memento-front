import React from "react";
import "./style.scss";

export default ({ teams }) => {
  return (
    <div className="workmenu-body-tabs">
      <h2 className="workmenu-body-tabs-title">Vos équipes</h2>
      {
        !teams && <p>Vous ne disposez pas encore d'équipe</p>
      }
    </div>
  );
};
