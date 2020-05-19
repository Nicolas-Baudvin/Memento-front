import React from 'react';
import { Dropdown } from 'semantic-ui-react';

export default () => {
  const handleClickAutoAssign = () => {

  };
  return (
    <Dropdown item icon="cog" simple>
      <Dropdown.Menu>
        <Dropdown.Item onClick={handleClickAutoAssign}>
          S'assigner cette tâche
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
