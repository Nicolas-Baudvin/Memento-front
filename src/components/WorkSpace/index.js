import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { useParams } from 'react-router-dom';
import "./style.scss";

// Components
import Header from "../Header";

export default () => {
  const { id } = useParams();
  return (
    <div data-tabId={id} className="workspace">
      <Header />
    </div>
  );
};
