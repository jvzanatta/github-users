const express = require('express');
const router = express.Router();

const https = require('https');

const access_token = 'access_token=eac66f701e75bd91a9d1b132b8c29744c4673efd';

const perPage = 15;

let options = {
  hostname: 'api.github.com',
  qs: { access_token: access_token },
  // path: '/users/',
  port: 443,
  method: 'GET',
  headers: {
    'User-Agent': 'Mozilla/5.0',
  },
};

/* GET users list */
router.get('/', function(req, res, next) {

  options.path = `/users?per_page=${perPage}&since=${req.query.since}&${access_token}`;

  https.get(options, (resp) => {
    let data = '';

    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', () => {
      data = JSON.parse(data);
      const since = parseInt(req.query.since) + data.length;
      const nextPageLink = `${req.protocol}://${req.get('host') + req.baseUrl}?since=${since}`;
      const respObject = { link: nextPageLink, data: data };

      res.send(respObject);
    });

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
});


/* GET user info */
router.get('/:username/details', function(req, res, next) {

  const username = req.params.username;

  options.path = `/users/${username}?${access_token}`;

  https.get(options, (resp) => {
    let data = '';

    // console.log(`${req.protocol}://${req.get('host') + req.baseUrl}`);

    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', () => {
      res.send(JSON.parse(data));
    });

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
});

/* GET user repos */
router.get('/:username/repos', function(req, res, next) {

  const username = req.params.username;

  options.path = `/users/${username}/repos?${access_token}`;

  https.get(options, (resp) => {
    let data = '';

    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', () => {
      res.send(JSON.parse(data));
    });

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
});

module.exports = router;
