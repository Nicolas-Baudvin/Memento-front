import React from "react";
import cx from 'classnames';
import "./style.scss";

export default ({ message, isSuccess, isVisible }) => (
  <div className={cx("popupWindow", { "popupWindow-visible": isVisible })}>
    <div className={cx("popupWindow-icon", { "icon-success": isSuccess })}>
    </div>
    <div className={cx("popupWindow-text", { "text-success": isSuccess })}>
      <p>{message}</p>
    </div>
  </div>
);
