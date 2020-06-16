import React from 'react';
import ReactMarkDown from 'react-markdown';
import { useHistory } from 'react-router-dom';

// Md file
import ChangeLogs from '../../../changelog.md';
import Footer from '../Footer';
// Styles
import './style.scss';

export default () => {
  const history = useHistory();

  const handleClickBackToHome = () => history.push("/");

  return (
    <>
      <div className="changelogs">
        <a onClick={handleClickBackToHome}> Retour à l'accueil</a>
        <ReactMarkDown source={ChangeLogs} className="changelogs-details" escapeHtml={false} />
      </div>
      <Footer />
    </>
  );
};
