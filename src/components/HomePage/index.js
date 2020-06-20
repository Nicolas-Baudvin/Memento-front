import React from "react";
import "./style.scss";

import Header from './Header';
import Footer from './Footer';
import Body from './Body';

export default () => {
  return (
    <div className="homePage">
      <Header />
      <Body />
      <Footer />
    </div>
  );
};
