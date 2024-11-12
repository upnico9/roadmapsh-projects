
import redis from 'redis';

const client = await redis.createClient().on('error', (error) => {
    console.error("An error occurred trying to connect to redis : ", error);
}).connect();

export async function getCacheData(location) {
    try {

        const data = await client.get(location);
        return JSON.parse(data);

    } catch (error) {
        throw error;
    }
}

export async function setCacheData(location, data) {
    try {
        const response = await client.set(location, JSON.stringify(data), {EX: 60 * 60, NX: true});
        console.log(response);
        return response;
    } catch (error) {
        console.log(error)
        throw error;
    }
}


export async function deleteCacheData(location) {
    try {
        const response = await client.del(location);
        return response;
    } catch (error) {
        throw error;
    }
}