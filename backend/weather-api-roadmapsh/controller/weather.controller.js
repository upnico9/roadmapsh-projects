import { getData } from "../api/api.js";
import { getCacheData, setCacheData } from "../cache/redis.js";


export async function getWeather(req, res) {
    try {
        const location = req.params.location;

        if (!location) {
            throw { status: 400, message: "Location is required" };
        }

        const data = await getCacheData(location);

        if (data) {
            console.log("Data from cache");
            res.status(200).send(data);
            return;
        }
        console.log("Data from API");
        const response = await getData(location);
        const formattedData = manageData(response);

        await setCacheData(location, formattedData);
        
        res.status(200).send(formattedData);
    } catch (error) {
        console.log(error)
        res.status(error.status || 500).send({ message: error.message });
    }
}

function manageData(data) {

    const days = data.days;
    const newData = {
        location: data.resolvedAddress,
        data: days.map((day) => {
            return {
                date: day.datetime,
                temp: day.temp,
                tempMin: day.tempmin,
                tempMax: day.tempmax,
                feelsLike: day.feelslike,
                feelsLikeMin: day.feelslikemin,
                feelsLikeMax: day.feelslikemax,
                sunrise: day.sunrise,
                sunset: day.sunset,
                description: day.conditions,
            };
        }),
    };

    return newData;
}