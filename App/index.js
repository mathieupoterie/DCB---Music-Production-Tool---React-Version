import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { demoContainer } from 'react-hot-loader';

ReactDOM.render(
  <demoContainer>
    <App />
  </demoContainer>,
  document.getElementById('root')
);

module.hot.accept('./App', () => {
  const NextApp = require('./App').default;
  ReactDOM.render(
    <demoContainer>
      <NextApp />
    </demoContainer>,
    document.getElementById('root')
  );
});
