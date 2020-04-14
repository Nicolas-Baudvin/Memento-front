import React from "react";
import { Icon, Button } from 'semantic-ui-react';
import cx from 'classnames';
import "./style.scss";

export default ({ message, isSuccess, isVisible }) => {
  return (
    <div className={cx("popupWindow", { "popupWindow-visible": isVisible })}>
      <div className={cx("popupWindow-icon", { "icon-success": isSuccess })}>
        <Icon name="info circle" size="huge" />
      </div>
      <div className={cx("popupWindow-text", { "text-success": isSuccess })}>
        <p>{message}</p>
      </div>
    </div>
  );
};
