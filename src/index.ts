import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import cors, { CorsOptions } from 'cors';

import express, { Express } from 'express';
import bodyParser from 'body-parser';
import routes from './routes.js';

const corsOptions: CorsOptions = {
    origin:'*',
    credentials:true,            //access-control-allow-credentials:true
    optionsSuccessStatus: 200,
}

const app: Express = express();

app.use(cors())
app.use(bodyParser.json({limit: '5mb'}));
app.use(routes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`)
})
