import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import request from 'request-promise';

const app = express();
const PORT = 4000;
const TID0 = 26681;
// const TID1 = 26686;

app.use(bodyParser.json());
app.use(cors());

// ENDPOINTS:
// 1. http://d6api.gaia.com/vocabulary/1/{tid}
// 2. http://d6api.gaia.com/videos/term/{tid}
// 3. http://d6api.gaia.com/media/{previewNid}

const options = {
  url: `http://d6api.gaia.com/vocabulary/1/${TID0}`,
  headers: {
    Accept: 'application/json',
  },
}

async function firstRequest() {
  try {
    const res = await request(options);
    const { terms } = JSON.parse(res);
    return terms;
  } catch (e) {
    throw e;
  }
}

app.get('/',  (req, res) => {
  return firstRequest().then(data => {
    res.status(200).json(data);
  });
});

app.listen(PORT);
