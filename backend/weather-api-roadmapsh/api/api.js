import axios from 'axios';
import dotenv from 'dotenv';
import { getCacheData, setCacheData } from '../cache/redis.js';
dotenv.config();


const API_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
const UNIT_GROUP = 'us';
const CONTENT_TYPE = 'json';
const API_KEY = process.env.WEATHER_API_KEY;

console.log(API_KEY);
console.log(API_URL);

export async function getData(location) {
    try {
        const url = `${API_URL}${location}?unitGroup${UNIT_GROUP}&key=${API_KEY}&contentType=${CONTENT_TYPE}`;
        const response = await axios.get(url);
        
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}
