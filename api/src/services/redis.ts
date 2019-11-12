import redis from 'async-redis';

export default redis.createClient({ url: process.env.REDIS_URL });
