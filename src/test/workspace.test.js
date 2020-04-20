/* eslint-disable no-undef */
import { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

// Component
import WorkSpace from '../components/WorkSpace';
import WorkMenu from '../components/WorkSpace/Menu';
import Header from '../components/Header';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useParams: () => ({
    id: 123
  }),
  useRouteMatch: () => ({
    url: '/vos-tableaux/123'
  })
}));

describe('<WorkSpace />', () => {

  it('should renders without crashing', () => {

    const wrapper = shallow(<WorkSpace />);
    expect(wrapper.find('div')).to.have.lengthOf(1);
    expect(wrapper).to.contain(<Header />);
    expect(wrapper).to.contain(<WorkMenu />);
  });

  it('should display workspace menu on click on the menu button', () => {

    const wrapper = shallow(<WorkSpace />);
    const button = wrapper.find('.workspace-menu-button').last();

    button.simulate('click');
    expect(wrapper.find('.workspace-menu menu-visible')).to.have.lengthOf(1);
  });

  it('should add a list on click on add list button', () => {


    const onClick = sinon.spy();
    const wrapper = shallow(<WorkSpace createList={onClick} />);
    const button = wrapper.find('.workspace-addlistbtn').last();

    button.simulate('click');

    const listsLength = wrapper.find('workspace-body-list');

    expect(onClick).to.have.been.called();
    expect(wrapper.find('workspace-body-list')).to.have.lengthOf(listsLength + 1);
  });

  it('should renders with id of tab', () => {
    const wrapper = shallow(<WorkSpace />);

    expect(wrapper.find('.workspace')).to.have.lengthOf(1);
    const firstDiv = wrapper.find('div').first();
    expect(firstDiv.prop('data-tabId')).to.deep.equal(123);
  });
});
