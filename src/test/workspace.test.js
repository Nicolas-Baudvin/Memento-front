/* eslint-disable no-undef */
import { expect } from 'chai';
import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import 'babel-polyfill';

// Component
import WorkSpace from '../components/WorkSpace';
import BodyHeader from '../components/WorkSpace/BodyHeader';
import Header from '../components/Header';
import List from '../components/WorkSpace/List';

// actions
import { NEW_LIST, MY_LISTS } from '../store/Lists/actions';
import { NEW_CURRENT_TAB } from '../store/Tabs/actions';
import { NEW_SOCKET_TAB } from '../store/Socket/actions';

// middlewares
import tabsMw from '../store/Tabs/middleware';
import userMw from '../store/Registration/middleware';
import popupMw from '../store/Popup/middleware';
import socketMw from '../store/Socket/middleware';
import listMw from '../store/Lists/middleware';
import taskMw from '../store/Tasks/middleware';
import actionMw from '../store/ActionsOnWorkSpace/middleware';
import favMw from '../store/Favs/middleware';
import chatMw from '../store/Chat/middleware';

// reducer
import reducer from '../store/reducer';

// import reducer from '../store/reducer';

const mockHistoryPush = jest.fn();
const mockLocationPathname = jest.fn();

jest.mock('react-beautiful-dnd', () => ({
  Droppable: jest.fn(
    // params to children are `provider`, `snapshot`
    ({ children }) => children({}, {})
  )
}));

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useParams: () => ({
    id: 123
  }),
  useRouteMatch: () => ({
    url: '/vos-tableaux/123'
  }),
  useHistory: () => ({
    push: mockHistoryPush
  }),
  useLocation: () => ({
    pathname: mockLocationPathname
  })
}));
const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: () => jest.fn()
}));

const middlewares = [tabsMw, userMw, popupMw, socketMw, listMw, taskMw, actionMw, favMw, chatMw];
const mockStore = configureStore(middlewares);

const initialState = {};
const store = mockStore(reducer);

describe('<WorkSpace />', () => {
  describe('<WorkSpace /> Owner', () => {
    const invited = false;
    describe('<Workspace /> Tabs Testing', () => {
      const wrapper = shallow(<WorkSpace isInvited={invited} />);

      it('should renders without crash', () => {
        expect(wrapper.contains(<Header />)).to.deep.equal(true);
        expect(wrapper.contains(<BodyHeader isInvited={invited} />)).to.deep.equal(true);
      });
      it("should have an invitation link", () => {
        const childWrapper = shallow(<BodyHeader
          userID="mongoID"
          currentTab={{ userID: "mongoID", _id: "tabId" }}
          currentSocket={{ socketId: 'socketId', invitationLink: 'link' }}
          isInvited={invited}
        />);
        const input = childWrapper.find('.workspace-body-header-popup').first();
        expect(input.props().trigger.props.defaultValue).to.deep.equals('http://localhost:3000/join/tabId/link/');
      });
      it("should add a list to tab", () => {
        
      });
    });
  });
});
