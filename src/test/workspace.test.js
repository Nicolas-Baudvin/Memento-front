/* eslint-disable no-undef */
import { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';

import 'babel-polyfill';

// Component
import WorkSpace from '../components/WorkSpace';
import List from '../components/WorkSpace/List';
import InvitationInput from '../components/WorkSpace/BodyHeader/InvitationInput';
import AddList from '../components/WorkSpace/BodyHeader/AddListInput';
import LoadPage from '../components/LoadPage';
import SearchContext from '../components/WorkSpace/List/searchContext';

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


describe('<WorkSpace />', () => {
  describe('<WorkSpace /> Owner', () => {
    const invited = false;
    describe('<Workspace /> Tabs Testing', () => {
      it('should renders without crash', () => {
        const wrapper = shallow(<WorkSpace
          isPublic={false}
          userID="mongoID"
          currentTab={{ userID: "mongoID", _id: "tabId" }}
          currentSocket={{ socketId: 'socketId', invitationLink: 'link' }}
          lists={[{ _id: "1", name: "Ma liste 1", tabId: "1" }, { _id: "2", name: "Ma liste 2", tabId: "2" }]}
          isInvited={invited}
        />);

        expect(wrapper.contains(<LoadPage active />)).to.deep.equal(true);
      });
      it("should have an invitation link", () => {
        const wrapper = shallow(<InvitationInput
          userID="mongoID"
          currentTab={{ userID: "mongoID", _id: "tabId" }}
          currentSocket={{ socketId: 'socketId', invitationLink: 'link' }}
          isInvited={invited}
        />);

        const input = wrapper.find('.workspace-body-header-popup').first();
        expect(input.props().trigger.props.value).to.deep.equals('https://mymemento.fr/join/tabId/link/');
      });
      it("should add a list to tab", () => {
        const contextValue = { search: '' };
        jest.spyOn(SearchContext, 'useAppContext')
          .mockImplementation(() => contextValue);
        const wrapper = shallow(<AddList currentTab={{ userID: "mongoID", _id: "tabId" }} />);
        const listWrapper = shallow(
          <List
            lists={[{ _id: "1", name: "Ma liste 1", tabId: "1" }, { _id: "2", name: "Ma liste 2", tabId: "2" }]}
            tasks={[]}
            currentTab={{ userID: "mongoID", _id: "tabId" }}
            isPublic={false}
            isInvited={invited}
          />
        );

        const input = wrapper.find('.workspace-body-header-input').first();
        const submit = wrapper.find('.workspace-body-header-input-submit').first();

        input.simulate('change', { target: { value: "Ma liste 3" } });

        submit.simulate('click');
        console.log(listWrapper.debug());
      });
    });
  });
});
