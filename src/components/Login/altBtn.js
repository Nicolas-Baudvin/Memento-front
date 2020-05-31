import React from "react";
import { Button, Icon } from 'semantic-ui-react';
import "./style.scss";

export default () => (
  <>
    <p> ou </p>

    <div className="form-alt">
      <Button className="form-alt-btn" color="red" icon>
        <Icon className="form-icon-google" name="google" size="big" />
        Se connecter avec Google
      </Button>

      <Button className="form-alt-btn" primary icon>
        <Icon className="form-icon-facebook" name="facebook" size="big" />
        Se connecter avec Facebook
      </Button>
    </div>
  </>
);
