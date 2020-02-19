import LoginView from '../src/components/Auth/LoginView';

import renderer from 'react-test-renderer';

test('LoginView', () => {
  const tree = renderer.create(LoginView()).toJSON();
  expect(tree).toMatchSnapshot();
});