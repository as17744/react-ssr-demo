import React from 'react';
import ReactDom from 'react-dom';
import App from './App';

ReactDom.hydrate(<App {...window.initialData} />, document.getElementById('root'))
