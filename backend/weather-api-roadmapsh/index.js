import express from "express";
import { getWeather } from "./controller/weather.controller.js";
import { rateLimit }from "express-rate-limit";

const PORT = 3000;
const app = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: "Too many requests from this IP, please try again after 15 minutes"
});

app.use(limiter);

app.get('/weather/:location', (req, res) => getWeather(req, res));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
