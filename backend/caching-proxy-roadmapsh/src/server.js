import Fastify from 'fastify';
import { cacheMiddleware } from './middleware.js';



export const startServer = (port, origin) => {
    const app = Fastify();

    app.addHook('onRequest', cacheMiddleware(origin)); 

    app.listen({port: port},(err, address) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(`Server listening on ${address}`);
    })
};




