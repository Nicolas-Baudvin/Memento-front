import React, { useState } from "react";
import cx from 'classnames';

export default ({ state, setstate, settingsNav }) => {
  const [settings, setSettings] = useState(settingsNav);

  const handleclickChangeView = (view) => (e) => {
    setstate({ ...state, currentMenu: view });
    const newSettingsArray = settings.map((item) => {
      if (item.title === view) {
        item.isSelected = true;
      }
      else {
        item.isSelected = false;
      }
      return item;
    });

    setSettings(newSettingsArray);
  };

  return (
    <nav className="settings-menu">
      <ul className="settings-menu-list">
        {
          settings.map((item) => <li
            onClick={handleclickChangeView(item.title)}
            className={cx("settings-menu-list__item", { selected: item.isSelected })}
            key={item.key}
          >
            {item.title}
          </li>)
        }
      </ul>
    </nav>
  );
};
