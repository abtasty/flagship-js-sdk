import flagship from '@flagship.io/node-sdk';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { EventEmitter } from 'events';
import React from 'react';
import App from './App';


Enzyme.configure({ adapter: new Adapter() });

flagship.initSdk = jest.fn().mockImplementation(() => ({
  newVisitor: () => {
    const self = new EventEmitter();
    return self;
  },
}));

describe('Flagship - React SDK', () => {
  let wrapper;
  const setFsVisitor = jest.fn();
  const useStateSpy: jest.SpyInstance = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation((fsVisitor) => [fsVisitor, setFsVisitor]);

  beforeEach(() => {
    wrapper = Enzyme.mount(<App />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    // console.log(wrapper.debug());
    expect(flagship.initSdk).toBeCalledTimes(1);
    expect(setFsVisitor).toHaveBeenCalledTimes(1);
    expect(wrapper.find('Alert').length).toBe(10);
  });
});
