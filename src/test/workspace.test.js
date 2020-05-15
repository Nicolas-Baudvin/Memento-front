/* eslint-disable no-undef */
import { expect } from 'chai';
import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
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

// pending


// reducer
import reducer from '../store/reducer';
// import reducer from '../store/reducer';

const mockHistoryPush = jest.fn();
const mockLocationPathname = jest.fn();

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

describe('<WorkSpace />', () => {
  describe('<WorkSpace /> Owner', () => {
    const invited = false;
    describe('<Workspace /> Tabs Testing', () => {

      const wrapper = mount(
        <WorkSpace isInvited={invited} />
      );

      it('should renders without crash', () => {
        console.log(mockStore.getState());
        expect(wrapper.contains(<Header />)).to.deep.equal(true);
        expect(wrapper.contains(<BodyHeader isInvited={invited} />)).to.deep.equal(true);
        expect(wrapper.contains(
          <List
            currentTab={mockStore.getState().mytabs.currentTab}
            lists={mockStore.getState().mylists.lists}
            isInvited={invited}
          />
        )).to.deep.equal(true);
      });
      it("should have an invitation link", () => {

      });
    });
  });
});
