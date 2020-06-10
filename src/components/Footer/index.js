import React, { useState, useEffect } from 'react';
import './style.scss';
import { Popup } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import loadPic from '../../Utils/loadPic';

const links = [
  { name: "News", path: "/assets/news.jpg" },
  { name: "Contact", path: "/assets/mail.jpg" },
  { name: "Légales", path: "/assets/legal.jpg" }
];

export default () => {
  const [newsPic, setNewsPic] = useState();
  const [mailPic, setMailPic] = useState();
  const [legPic, setLegPic] = useState();
  const history = useHistory();

  const getNewsPic = async (img) => {
    const pic = await loadPic(img.path);
    switch (img.name) {
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
        <Popup
          trigger={<img onClick={handleClickNewsPic} src={newsPic} alt="changelogs" />}
          content="Les dernières nouveautés"
        />
      </div>
      <div className="footer-block">
        <Popup
          trigger={<a href="mailto:support@mymemento.fr"><img src={mailPic} alt="support@mymemento.fr" /></a>}
          content="Contactez moi !"
        />
      </div>
      <div className="footer-block">
        <Popup
          trigger={<img onClick={GoToLegalsMentions} src={legPic} alt="mentions légales" />}
          content="Mentions légales"
        />
      </div>
    </footer>
  );
};
