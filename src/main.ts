import { createServer } from 'http';

import express from 'express';

import config from './config';
import loaders from './loaders';

async function main() {
    const app = express()
    const httpServer = createServer(app);
    await loaders(app);

    httpServer.listen(config.port, () => {
        console.log(`App listening on port ${config.port}`);
    });
}

main();