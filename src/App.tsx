import React from 'react';
import { useSelector } from 'react-redux';

import './App.scss';
import Start from './components/Start';
import { Finish } from './components/Finish';

import { isLoading, getMessage, selectTodos } from './store';

const App = () => {
  const loading = useSelector(isLoading);
  const todos = useSelector(selectTodos);
  const message = useSelector(getMessage) || 'Ready!';

  return (
    <div className="App">
      <h1>Redux list of todos</h1>
      <h2>{loading ? 'Loading...' : message}</h2>

      <Start title="Start loading" />
      <Finish title="Succeed loading" message="Loaded successfully!" />
      <Finish title="Fail loading" message="An error occurred when loading data." />

      {todos.map(({ id, title, completed }) => (
        <div key={id}>
          {title}
          {' '}
          <input type="checkbox" defaultChecked={completed} disabled />
        </div>
      ))}
    </div>
  );
};

export default App;
