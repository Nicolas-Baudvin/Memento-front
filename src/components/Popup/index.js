import React from "react";
import { Icon } from 'semantic-ui-react';
import cx from 'classnames';
import "./style.scss";

export default ({ message, isSuccess, isVisible }) => (
  <div className={cx("popupWindow", { "popupWindow-visible": isVisible })}>
    <div className={cx("popupWindow-icon", { "icon-success": isSuccess })}>
      <Icon name="info circle" size={window.screen.width <= 767 ? "big" : "huge"} />
    </div>
    <div className={cx("popupWindow-text", { "text-success": isSuccess })}>
      <p>{message}</p>
    </div>
  </div>
);
