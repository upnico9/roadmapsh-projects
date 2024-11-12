import { startServer } from "./server.js";
import RedisCache from "./redis.js";

export async function manageOptions(argv) {
    if (argv["clear-cache"]) {
        console.log("Clearing cache...");
        const cache = new RedisCache();
        await cache.clear();
    } else {
        console.log("Starting server...");
        startServer(argv.port, argv.origin);
    }
}