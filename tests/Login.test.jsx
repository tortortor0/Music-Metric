import renderer from 'react-test-renderer';
import Login from '../client/components/Login.jsx';
import React from 'react';

it('logs in when getLogin is triggered', () => {
  const component = renderer.create(
    <Login></Login>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  renderer.act(() => {
    component.root.findByProps({className: 'login-button'}).props.onClick();
  });
  
  // re-rendering
  tree = component.toJSON();
  expect(tree.containsMatchingElement(<Graph />)).toEqual(true);});