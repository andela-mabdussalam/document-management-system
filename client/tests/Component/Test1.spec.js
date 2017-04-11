import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import App from '../../src/components/App';

describe('<App/>', () => {
    const setUp = () => {
      const props = {
        children: {},
      };
      const wrapper = shallow(<App><div>Hi</div></App>);
      return { wrapper, props};
    };

  it('should render childre', function () {
    const { wrapper } = setUp();
    expect(wrapper.length).to.eql(1);
  });
});
