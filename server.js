'use strict';

const express = require('express');
const unirest = require('unirest');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(morgan('common'));
app.use(express.static('public')); 
app.use(bodyParser.json()); // parse JSON body
app.use(cors());

// These code snippets use an open-source library. http://unirest.io/nodejs

let result;


// console.log(Request.body);

app.get('/', (req, res) => {
  // const item = Request.body;
  console.log('request made!');
  console.log(bodyResult);
  // console.log(item);
  res.json(bodyResult);
});

let bodyResult;

let Request;
//Capture API Data from TrailAPI
Request = unirest.get('https://trailapi-trailapi.p.mashape.com/?limit=1&lon=-&q[activities_activity_type_name_eq]=hiking&q[city_cont]=Colorado+Springs&q[country_cont]=United+States&q[state_cont]=Colorado&radius=10')
  .header('X-Mashape-Key', 'jvHLN2ffP4mshDADMnyUd0OkSXaXp16hQKqjsnIpARwMYTtPWp')
  .header('Accept', 'text/plain')
  .end(function (result) {
    // console.log(result.body);
    bodyResult = result.body;
    // console.log(bodyResult);
    return bodyResult;
  });



//Server functions
// let server;

// function runServer() {
//   const port = process.env.PORT || 8080;
//   return new Promise((resolve, reject) => {
//     server = app.listen(port, () => {
//       console.log(`Your app is listening on port ${port}`);
//       resolve(server);
//     }).on('error', err => {
//       reject(err);
//     });
//   });
// }

// function closeServer() {
//   return new Promise((resolve, reject) => {
//     console.log('Closing server');
//     server.close(err => {
//       if (err) {
//         reject(err);
//         // so we don't also call `resolve()`
//         return;
//       }
//       resolve();
//     });
//   });
// }

// if (require.main === module) {
//   runServer().catch(err => console.error(err));
// } 

app.listen(process.env.PORT || 8080, () => console.log(
  `Your app is listening on port ${process.env.PORT || 8080}`));


