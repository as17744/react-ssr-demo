import React from 'react';
import { BrowserRouter, StaticRouter } from 'react-router-dom';
import axios from 'axios';
import Home from './components/Home';

const App = (props) => {
  const { location, data } = props;
  if (typeof window === 'undefined') {
    return (
      <StaticRouter location={location} >
        <Home {...data}></Home>
      </StaticRouter>
    );
  }
  return (
    <BrowserRouter>
      <Home {...data}></Home>
    </BrowserRouter>
  );
};

App.getInitialProps = () => new Promise((resolve) => {
  axios.get('http://localhost:4001/api').then((res) => {
    resolve(res.data);
  });
});

export default App;
