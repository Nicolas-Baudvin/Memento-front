import React from "react";
import cx from 'classnames';
import "./style.scss";

export default ({ message, isSuccess, isVisible }) => (
  <div className={cx("popupWindow", { "popupWindow-visible": isVisible })}>
    <div className={cx("popupWindow-header", { "header-success": isSuccess })}>
      {
        isSuccess ? "Succès !" : "Échec !"
      }
    </div>
    <div className={cx("popupWindow-text", { "text-success": isSuccess })}>
      <p>{message}</p>
    </div>
  </div>
);
