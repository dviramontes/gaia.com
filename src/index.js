import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import request from 'request-promise';

const app = express();
const PORT = 4000;

app.use(bodyParser.json());
app.use(cors());

// TODO:
// [x]- fetch http://d6api.gaia.com/vocabulary/1/{tid}
// [ ]- http://d6api.gaia.com/videos/term/{tid}
// [ ]- http://d6api.gaia.com/media/{previewNid}

function formatRequestOptions(tid = 26681) {
 return {
   url: `http://d6api.gaia.com/vocabulary/1/${tid}`,
   headers: {
     Accept: 'application/json',
   },
 };
}

async function fetchVocabulary(tid) {
  try {
    const res = await request(formatRequestOptions(tid));
    const { terms } = JSON.parse(res);
    return terms;
  } catch (e) {
    throw e;
  }
}

app.get('/terms/:tid/longest-preview-media-url', async (req, res) => {
  try {
    const tid = req.params.tid;
    const terms = await fetchVocabulary(tid);
    res.status(200).json(terms);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(PORT);
