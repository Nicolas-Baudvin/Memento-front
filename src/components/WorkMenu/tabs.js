import React from "react";
import { useSelector } from "react-redux";
import "./style.scss";

export default ({ openThisTab }) => {
  const { tabs } = useSelector((GlobalState) => GlobalState.mytabs);

  return (
    <div className="workmenu-tabs">
      {
        tabs.map((tab) => (
          <div onClick={() => openThisTab(tab._id)} key={tab._id} className="workmenu-tabs-item">
            <h2 className="workmenu-tabs-item-title"> {tab.name} </h2>
            <img className="workmenu-tabs-item-img" src={tab.imgPath} alt="Fond de votre tableau" />
          </div>
        ))
      }
    </div>
  );
};
