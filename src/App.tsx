import React, { useState } from 'react';
import { MouseMoveListener } from './components/MouseMoveListener';

const App = () => {
  const [color, setColor] = useState('blue');

  return (
    <div className="App">
      <input
        type="color"
        value={color}
        onChange={({ target: { value } }) => setColor(value)}
      />

      <MouseMoveListener>
        {({ x, y }) => (
          <div style={{ color }}>
            {`x: ${x}; y: ${y}`}
          </div>
        )}
      </MouseMoveListener>
    </div>
  );
};

export default App;
