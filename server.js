const express = require('express');
const devMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const React = require('react');
const { renderToString } = require('react-dom/server');
const webpackClientConfig = require('./bin/webpack.client.js');
const webpackServerConfig = require('./bin/webpack.server.js');

const webpackClientCompiler = webpack(webpackClientConfig);
const webpackServerCompiler = webpack(webpackServerConfig);

const app = express()

const initialData = {
  location: '/',
  data: null,
};

app.use('/api', (req, res, next) => {
  res.send({
    result: 'success',
    projects: [
      {
        address: '北京 北京市 怀柔区',
      },
      {
        address: '湖北省 黄冈市 团风县',
      },
      {
        address: '福建省 泉州市 安溪县',
      },
      {
        address: '广东省 潮州市 饶平县'
      }
    ]
  })
});

app.use(devMiddleware(webpackServerCompiler, {
  stats: {
    colors: true
  },
  writeToDisk: true
}));

app.use(devMiddleware(webpackClientCompiler, {
  stats: {
    colors: true
  },
  writeToDisk: true
}));

app.use('/', async function(req, res, next) {
  initialData.location = req.path;
  const App = require('./dist/server/server').default;
  if (App.getInitialProps) {
    initialData.data = await App.getInitialProps();
  }
  const content = renderToString(React.createElement(App, initialData));

  res.send(
    `
     <html>
       <head>
         <title>ssr</title>
         <link href="/main.css" rel="stylesheet" />
         <script>
            window.initialData = ${JSON.stringify(initialData)};
         </script>
       </head>
       <body>
         <div id="root">${content}</div>
         <script src="/index.js"></script>
       </body>
     </html>
    `
  );
})

const clientDone = () => new Promise((resolve) => {
  webpackClientCompiler.hooks.done.tap('done', stats => {
    resolve();
  });
});

const serverDone = () => new Promise((resolve) => {
  webpackServerCompiler.hooks.done.tap('done', stats => {
    resolve();
  });
});


Promise.all([clientDone(), serverDone()]).then(() => {
  app.listen(4001, () => {
    console.log(`Server is running at 4001`);
  });
});

