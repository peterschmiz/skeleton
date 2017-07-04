const fs = require('fs');
const express = require('express');

const config = JSON.parse(fs.readFileSync('./package.json')) || {};
const app = express();

app.use(express.static(config.siteConfig.directories.dist, {
  index: false,
}));

/* eslint-disable no-underscore-dangle */
app.engine('pug', require('pug').__express);
/* eslint-enable no-underscore-dangle */

app.set('views', `${config.siteConfig.directories.src}/views`);
app.set('view engine', 'pug');
app.locals.pretty = true;

app.get('/:id?', (req, res) => {
  const current = req.params.id ? req.params.id.replace('.html', '') : 'index';
  const filename = `${__dirname}/src/views/${current}.pug`;
  const localData = JSON.parse(fs.readFileSync(config.siteConfig.directories.views.localData));
  const data = Object.assign({}, localData, { config: config.siteConfig });

  fs.access(filename, fs.R_OK, (err) => {
    if (err) {
      res.status(404).send(`404 File not found: ${filename}`);
      return;
    }

    res.render(current, data, (renderError, html) => {
      res.send(!renderError ? html : `<pre>${renderError.message}</pre>`);
    });
  });
});


app.listen(3000, () => {
  /* eslint-disable no-console */
  console.log('Express server ready on http://localhost:3000');
});
