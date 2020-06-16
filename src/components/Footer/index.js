import React, { useState, useEffect } from 'react';
import './style.scss';
import { Tooltip } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import loadPic from '../../Utils/loadPic';

const links = [
  { name: "News", path: "/assets/news.webp" },
  { name: "Contact", path: "/assets/mail.webp" },
  { name: "Légales", path: "/assets/legal.webp" }
];

export default () => {
  const [newsPic, setNewsPic] = useState();
  const [mailPic, setMailPic] = useState();
  const [legPic, setLegPic] = useState();
  const history = useHistory();

  const getNewsPic = async (img) => {
    const pic = await loadPic(img.path);
    switch (img.name)
    {
      case "News": {
        setNewsPic(pic);
        break;
      }
      case "Contact": {
        setMailPic(pic);
        break;
      }
      case "Légales": {
        setLegPic(pic);
        break;
      }
      default: {
        break;
      }
    }
  };

  const GoToLegalsMentions = () => history.push("/mentions-legales/");

  const handleClickNewsPic = () => history.push("/nouveautes/");

  useEffect(() => {
    links.forEach((item) => {
      getNewsPic(item);
    });
  }, []);
  return (
    <footer className="footer">
      <div className="footer-block">
        <Tooltip placement="top" title="Les dernières mises à jours">
          <img onClick={handleClickNewsPic} src={newsPic} alt="changelogs" />
        </Tooltip>
      </div>
      <div className="footer-block">
        <Tooltip placement="top" title="Contactez moi">
          <a href="mailto:support@mymemento.fr"><img src={mailPic} alt="support@mymemento.fr" /></a>
        </Tooltip>
      </div>
      <div className="footer-block">
        <Tooltip placement="top" title="Mentions légales">
          <img onClick={GoToLegalsMentions} src={legPic} alt="mentions légales" />
        </Tooltip>
      </div>
    </footer>
  );
};
