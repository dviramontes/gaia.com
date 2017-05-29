import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import request from 'request-promise';
import first from 'lodash.first';
import has from 'lodash.has';

const app = express();
const PORT = 4000;

app.use(bodyParser.json());
app.use(cors());

function formatRequestOptions(type, id) {
  let url = null;
  switch (type) {
    case 'vocab':
      url = `http://d6api.gaia.com/vocabulary/1/${id}`;
      break;
    case 'term':
      url = `http://d6api.gaia.com/videos/term/${id}`;
      break
    case 'media':
      url = `http://d6api.gaia.com/media/${id}`;
      break;
    default:
      break;
  }
  return {
    url,
    headers: {
      Accept: 'application/json',
    },
    json: true,
  };
}

async function fetchVocabulary(tid) {
  try {
    const res = await request(formatRequestOptions('vocab', tid));
    const { terms } = res;
    return terms;
  } catch (e) {
    throw e;
  }
}

async function fetchTerm(tid) {
  try {
    const res = await request(formatRequestOptions('term', tid));
    return res;
  } catch (e) {
    throw e;
  }
}

async function fetchMedia(nid) {
  try {
    const res = await request(formatRequestOptions('media', nid));
    return res;
  } catch (e) {
    throw e;
  }
}

function findLongestDurationTitle(titles) {
  const withPreviews = titles.filter(title => has(title, 'preview'));
  const longestDurationValue = withPreviews
    .map(title => +title.preview.duration)
    .reduce((a, b) => {
      return Math.max(a, b);
    });
  const titleWithLongestDuration = withPreviews
    .find(title => +title.preview.duration === longestDurationValue);
  return titleWithLongestDuration;
}

app.get('/terms/:tid/longest-preview-media-url', async (req, res) => {
  try {
    const tidParam = req.params.tid;
    const terms = await fetchVocabulary(tidParam);
    const { tid } = first(terms);
    const { titles } = await fetchTerm(tid);
    const longestTitle = findLongestDurationTitle(titles);
    const { preview: { nid } } = longestTitle;
    const { mediaUrls: { bcHLS } } = await fetchMedia(nid);
    res.status(200).json({ bcHLS });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(PORT);
