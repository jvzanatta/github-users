const express = require('express');
const router = express.Router();

const https = require('https');

/**
 * Token to enable more than 60 requests per hour on GitHub
 */
const access_token = 'access_token=eac66f701e75bd91a9d1b132b8c29744c4673efd';

/**
 * Limit users per page to 15
 */
const perPage = 15;

/**
 * Options for the HTTPS requests
 */
let options = {
  hostname: 'api.github.com',
  qs: { access_token: access_token },
  port: 443,
  method: 'GET',
  headers: {
    'User-Agent': 'Mozilla/5.0',
  },
};

/**
 *  GET user's list from GitHub
 */
router.get('/', function(req, res, next) {
  // Path + parameters
  options.path = `/users?per_page=${perPage}&since=${req.query.since}&${access_token}`;

  https.get(options, (resp) => {
    let data = '';
    // Collect data until it's finished
    resp.on('data', (chunk) => {
      data += chunk;
    });

    // Assemble responde then send
    resp.on('end', () => {
      data = JSON.parse(data);
      // Calculates new since variable
      const since = parseInt(req.query.since) + data.length;
      // Link to next page (GitHub does not provide total users through API
      // so there is no way to know if the URL will bring more users)
      const nextPageLink = `${req.protocol}://${req.get('host') + req.baseUrl}?since=${since}`;
      const respObject = { link: nextPageLink, users: data };

      res.send(respObject);
    });

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
});


/**
 * GET user info
 */
router.get('/:username/details', function(req, res, next) {

  const username = req.params.username;
  // Path + parameters
  options.path = `/users/${username}?${access_token}`;

  https.get(options, (resp) => {
    let data = '';
    // Collect data until it's finished
    resp.on('data', (chunk) => {
      data += chunk;
    });
    // Send response
    resp.on('end', () => {
      res.send(JSON.parse(data));
    });

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
});

/**
 * GET user's repositories
 */
router.get('/:username/repos', function(req, res, next) {

  const username = req.params.username;
  // Path + parameters
  options.path = `/users/${username}/repos?${access_token}`;

  https.get(options, (resp) => {
    let data = '';
    // Collect data until it's finished
    resp.on('data', (chunk) => {
      data += chunk;
    });
    // Send response
    resp.on('end', () => {
      res.send(JSON.parse(data));
    });

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
});

module.exports = router;
