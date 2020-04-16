import React, { useState } from "react";
import { Button } from 'semantic-ui-react';
import "./style.scss";

// Components
import Menu from 'src/components/SideMenu';

export default ({ history, handleOpen }) => {
  const initialState = {
    show: false,
  };
  const [state, setstate] = useState(initialState);

  return (
    <header className="workmenu-header">
      <nav className="workmenu-header-nav">
        <Button onClick={() => history.push("/")} icon="home" />
        <Button icon="help circle" />
        <Button onClick={() => history.push("/vos-tableaux/")} icon="table" />
      </nav>
      <h1 className="workmenu-header-title" onClick={() => history.push("/vos-tableaux/")}>Memento</h1>
      <Button onClick={() => setstate({ ...state, show: !state.show })} content="Menu" icon="bars" />
      {
        state.show && <Menu handleOpen={handleOpen} />
      }
    </header>
  );
};
