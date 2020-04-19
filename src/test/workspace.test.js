import { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';

import App from '../components/App/index';
import Home from '../components/Home/index';

describe('<App />', function() {
  it('renders without crashing', function() {
    const wrapper = shallow(<App />);

    expect(wrapper).to.contain(<Home />);
  });
});
