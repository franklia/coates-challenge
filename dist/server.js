import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; // require('dotenv').config();

import readline from 'readline';
import fs from 'fs'; // create instances

const app = express();
const router = express.Router(); // const PORT = process.env.PORT || 3001;

const PORT = 3001; // configure the API to use bodyParser and look for JSON data in the request body

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json()); // Enable CORS
// app.use(
//   cors({
//     origin: process.env.CORS_ORIGIN,
//   })
// );
// Test route

router.get('/test', (req, res) => {
  res.send('The weather api is working!');
});
router.get('/temperatures', async (req, res) => {
  const rl = readline.createInterface({
    input: fs.createReadStream('/Users/Frank/Google Drive/Coding/Dev _Tests/Coates_Group/sydney-temperatures.csv', 'utf8'),
    crlfDelay: Infinity
  });
  let result = [];

  const compile = async () => {
    for await (const line of rl) {
      const lineArray = line.split(',');
      result.push(lineArray);
    }
  };

  await compile();
  result.shift();
  console.log(result);
  res.send(result);
}); // Use our router configuration when we call /api

app.use('/api', router);
app.listen(PORT, () => console.log('Listening on port ' + PORT));