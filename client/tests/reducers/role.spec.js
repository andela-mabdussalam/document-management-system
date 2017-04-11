import { expect } from 'chai';
import roleReducer from '../../src/reducers/roles';


describe('Role reducer', () => {
  const initialState = [];

  it('should return the initial state', () => {
    expect(roleReducer(undefined, [])).to.eql([]);
  });

  it('should return the new state after the action is disptched', () => {
    const newRole = { id: 1, title: 'admin' };
    const newState = [...initialState, newRole];
    const testAction = { type: 'CREATE_ROLE', role: newRole };
    expect(roleReducer(initialState, testAction)).to.eql(newState);
  });
  it('should return the all state', () => {
    const roles =
       { id: 1, title: 'admin' };
    const newState = [...initialState, roles];
    const testAction = { type: 'GET_ROLE', roles };
    expect(roleReducer([roles], testAction)).to.eql(newState);
  });
});
