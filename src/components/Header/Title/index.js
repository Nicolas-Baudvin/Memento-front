import React from "react";
import { useHistory } from "react-router-dom";

export default ({ state }) => {
  const history = useHistory();
  return (
    <div className="workmenu-header-title">

      {
        state.logo && <img className="workmenu-header-title-logo" src={state.logo} alt="logo" />
      }

      <h1 onClick={() => history.push("/vos-tableaux/")}>Memento</h1>
    </div>
);
};
