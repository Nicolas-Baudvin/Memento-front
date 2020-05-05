/* eslint-disable no-undef */
import { expect } from 'chai';
import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

// Component
import WorkSpace from '../components/WorkSpace';
import BodyHeader from '../components/WorkSpace/BodyHeader';
import Header from '../components/Header';
import List from '../components/WorkSpace/List';

// reducer
// import reducer from '../store/reducer';

const reducer = (state) => state;

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

describe('<WorkSpace />', () => {
  describe('<WorkSpace /> Owner', () => {
    const invited = false;
    describe('<Workspace /> Tabs Testing', () => {
      const mockStore = createStore(reducer, {
        userData: { datas: { userID: "123" } },
        mytabs: {
          tabs: [],
          currentTab: { userID: '123' }
        },
        mylists: {
          lists: []
        },
        sockets: {
          currentSocket: { owner: { username: 'John' } },
          mySockets: [],
          socketsList: []
        },
        mytasks: {
          tasks: []
        },
      });
      const wrapper = mount(
        <Provider store={mockStore}>
          <WorkSpace isInvited={invited} />
        </Provider>
      );

      it('should renders without crash', () => {
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
    });
  });
});
