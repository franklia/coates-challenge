import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import readline from 'readline';
import fs from 'fs';

const app = express();
const router = express.Router();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Enable CORS
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

// Test route
router.get('/test', (req, res) => {
  res.send('The weather api is working!');
});

// GET an array of temperature objects for 10 days from csv file
router.get('/temperatures', async (req, res) => {
  const rl = readline.createInterface({
    input: fs.createReadStream(`${process.env.LOCAL_PATH}/src/sydney-temperatures.csv`, 'utf8'),
    crlfDelay: Infinity,
  });

  let result = [];

  const compile = async () => {
    for await (const line of rl) {
      const lineArray = line.split(',');
      let singleObj = {};
      const obj = lineArray.map((item, index) => {
        if (index === 0) {
          singleObj['date'] = item;
        } else if (index === 1) {
          singleObj['max'] = item;
        } else {
          singleObj['min'] = item;
        }
      });
      result.push(singleObj);
    }
  };

  await compile();
  result.shift();
  res.send(result);
});

// Use our router configuration when we call /api
app.use('/api', router);

app.listen(PORT, () => console.log('Listening on port ' + PORT));
