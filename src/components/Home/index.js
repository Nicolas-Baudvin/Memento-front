import React from "react";
import "./style.scss";

// component
import Registration from "../Login";

export default () => (
  <main className="home">
    <h1 className="home-title">Bienvenue sur Memento</h1>
    <div className="home-registration">
      <Registration />
    </div>
  </main>
);
