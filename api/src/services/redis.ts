import redis from 'redis';
import { promisify } from 'util';

export const client = redis.createClient({ url: process.env.REDIS_URL });
export const getAsync = promisify(client.get);
export const setAsync = promisify(client.set) as any;
