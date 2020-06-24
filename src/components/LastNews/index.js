import React from 'react';
import ReactMarkDown from 'react-markdown';

import ChangeLogs from '../../../assets/changelog.md';

// Styles
import './style.scss';

import Header from '../HomePage/Header';

export default () => (
  <>
    <Header />
    <div className="changelogs">
      <ReactMarkDown source={ChangeLogs} className="changelogs-details" escapeHtml={false} />
    </div>
  </>
);
