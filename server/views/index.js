module.exports = function renderFullPage(html, initialState) {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <title>New Name</title>
      <meta charset="UTF-8" name="viewport" content="width=device-width, initial-scale=1">

      <link rel="stylesheet" href="./styles/styles.css" charset="utf-8">
      <link rel="stylesheet" href="./styles/simple-grid.css" charset="utf-8">

      <link href='https://fonts.googleapis.com/css?family=Inconsolata:400,700' rel='stylesheet' type='text/css'>
    </head>
    <body>
      <div id="app">${html}</div>
      <script src="./dist/bundle.js" async></script>
      <script src="https://connect.soundcloud.com/sdk/sdk-3.0.0.js"></script>
      <script>
        console.log('Initial State: ', initialState);
        window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
      </script>
    </body>
  </html>
  `
};
