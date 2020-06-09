import React, { useState, useEffect } from 'react';
import './style.scss';
import { Popup } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import loadPic from '../../Utils/loadPic';

const links = [
  { name: "News", path: "/assets/news.webp" },
  { name: "Contact", path: "/assets/mail.png" }
];

export default () => {
  const [newsPic, setNewsPic] = useState();
  const [mailPic, setMailPic] = useState();
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
      default: {
        break;
      }
    }
  };

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
          content="Contactez nous !"
        />
      </div>
    </footer>
  );
};
