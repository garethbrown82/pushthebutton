import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('orders numbers correctly', () => {
  const unorderedNumbers = [4, 2, 21, 37, 17];
  const orderedNumbers = unorderedNumbers.sort((a, b) => a-b);

  expect(orderedNumbers).toEqual([2, 4, 17, 21, 37]);
})
