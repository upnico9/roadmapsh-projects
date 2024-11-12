import RedisCache from "./redis.js";
import axios from "axios";

const cacheMiddleware = (origin) => {
    return async (request, reply) => {
        const url = request.url;
        const method = request.method;
        const key = `${method}:${url}`;

        const cache = new RedisCache();
        try {
            const cachedResponse = await cache.get(key);
            if (cachedResponse) {
                reply.header("X-Cache", "HIT");
                reply.status(200).send(cachedResponse);
                return;
            } else {
                const response = await axios.get(`${origin}${url}`)
                cache.set(key, response.data);
                reply.header("X-Cache", "MISS");
                reply.status(200).send(response.data);
            }
        } catch (error) {
            reply.status(500).send("Error fetching data from the origin server");
        }
    };
}

export { cacheMiddleware };