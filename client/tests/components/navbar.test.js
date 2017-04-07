import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar , mapStateToProps } from '../../src/components/common/Navbar';
import { shallow } from 'enzyme';

describe('Header', () => {
  let wrapper;
  const mockFunc = spy();
  const headerProps = {
    auth: {
      isAuthenticated: false
    },
    logout: mockFunc
  }
  beforeEach(() => {
    wrapper = shallow(<Navbar {...headerProps}/>)
  })
  it('should be able to create a role', (done) => {
    expect(wrapper.find(Link)).to.have.length(2);
  });
});
