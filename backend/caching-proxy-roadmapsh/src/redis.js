import { createClient } from "redis";

class RedisCache {
    constructor() {
        this.client = createClient();
    }

    async connect() {
        if (!this.client.isOpen) {
          await this.client.connect()
        }
      }
    
      async disconnect() {
        if (this.client.isOpen) {
          await this.client.disconnect()
        }
      }

    async set(key, value) {
        try {
            await this.connect();
            await this.client.set(key, JSON.stringify(value), {
                EX: 300,
                NX: true
            });
            await this.disconnect();
        } catch (error) {
            console.error(error);
        }
    }

    async get(key) {
        try {
            await this.connect();
            const value = await this.client.get(key);
            await this.disconnect();
            return JSON.stringify(value);
        } catch (error) {
            console.error(error);
        }
    }

    async clear() {
        await this.connect();
        await this.client.flushDb();
        await this.disconnect();
    }

}


export default RedisCache;