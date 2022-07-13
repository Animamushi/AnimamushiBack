import express from 'express';
import cors from 'cors';
import routerAnimamushi from './routes/index';
import { boomErrorHandler, errorHandler, logErrors } from './middlewares/error.handler';

const app = express();
const PORT = process.env.PORT || 3300;
const API_ROUTE = process.env.API_ROUTE || '/api/v1';

app.use(express.json());

const whitelist = ['http://localhost:3300', 'http://localhost:3000', 'https://animamushi.com'];

const options = {
    origin: (origin: any, callback: any) => {
        if (whitelist.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('no permitido'));
        }
    }
}
app.use(cors(options));

app.get('/', (_req, res) => {
    //console.log('root');
    const apiInfo = {
        links: {
            self: API_ROUTE,
            anime: API_ROUTE + "/anime",
            episode: API_ROUTE + "/episode"
        }
    }
    res.send(apiInfo)
})

routerAnimamushi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server on port 
    ***************************
     http://localhost:${PORT}/
     **************************
     🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀`)
})
