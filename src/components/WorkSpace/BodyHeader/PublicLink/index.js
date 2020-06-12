import React from 'react';
import { Popup, Input } from 'semantic-ui-react';

export default ({ currentTab, copyToClipBoard }) => (
  <>
    <Popup
      trigger={<Input
        className="workspace-body-header-input"
        action={{ content: "Copier", color: "blue", onClick: copyToClipBoard }}
        value={`https://www.mymemento.fr/public/${currentTab.name}/${currentTab._id}`}
      />}
      content="Lien d'invitation public"
    />
  </>
);
