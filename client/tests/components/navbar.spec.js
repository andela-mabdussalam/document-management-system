import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar , mapStateToProps } from '../../src/components/common/Navbar';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';

describe('Navbar', () => {
  let wrapper;
  const mockFunc = sinon.spy();
  const headerProps = {
    auth: {
      isAuthenticated: false
    },
    logout: mockFunc
  }
  beforeEach(() => {
    wrapper = shallow(<Navbar {...headerProps}/>)
  })
  it('when a user is signed out', () => {
    expect(wrapper.find(Link)).to.have.length(2);
  });


describe('when user is signed in', () => {
    const authProps = {
      isAuthenticated: true,
      user: {
        userName: 'test'
      }
    };
    let navItem, link;
    beforeEach(() => {
      wrapper = shallow(<Navbar {...headerProps} {...authProps} />);
      navItem = wrapper.find('div').at(1);
      link = wrapper.find('div').at(2);
    });
    it('should have Links', () => {
      expect(navItem.html()).to.contain(`Hi!,${authProps.user.userName}`);
      expect(link).to.have.length(1);
    });
    it('should trigger logout when clicked', () => {
      const logoutLink = navItem.find('a');
      logoutLink.simulate('click', { preventDefault: mockFunc });
      expect(mockFunc).to.have.property('callCount', 2);
    });
  });

    describe('mapStateToProps', () => {
    it('should return correct props if user is not authenticated', () => {
      const mockState = { auth: { isAuthenticated: false } };
      const { isAuthenticated, user, isAdmin } = mapStateToProps(mockState);
      expect(isAuthenticated).to.equal(false);
      expect(user).to.be.undefined;  //eslint-disable-line
      expect(isAdmin).to.equal(false);
    });
    it('should return correct props if user is authenticated', () => {
      const mockState = { auth: { isAuthenticated: true, user: { userRoleId: 2 } } };
      const { isAuthenticated, user, isAdmin } = mapStateToProps(mockState);
      expect(isAuthenticated).to.equal(true);
      expect(user).to.be.defined; //eslint-disable-line
      expect(isAdmin).to.equal(false);
    });
    it('should return correct props if user is authenticated', () => {
      const mockState = { auth: { isAuthenticated: true, user: { userRoleId: 1 } } };
      const { isAuthenticated, user, isAdmin } = mapStateToProps(mockState);
      expect(isAuthenticated).to.equal(true);
      expect(user).to.be.defined;  //eslint-disable-line
      expect(isAdmin).to.equal(true);
    });
  });
  });


