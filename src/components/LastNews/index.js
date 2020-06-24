import React from 'react';
import ReactMarkDown from 'react-markdown';

// Styles
import './style.scss';

import Header from '../HomePage/Header';

export default () => (
  <>
    <Header />
    <div className="changelogs">
      <ReactMarkDown source="/assets/changelog.md" className="changelogs-details" escapeHtml={false} />
    </div>
  </>
);
