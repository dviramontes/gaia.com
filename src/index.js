import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = 4000;

app.use(bodyParser.json());
app.use(cors());

app.listen(PORT);
