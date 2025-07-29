const axios = require("axios");
async function zodiacPrediction(req, res) {
  const { sign, type } = req.query || {};

  try {
    let url = "";
    if (type === "daily") {
      url = `https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${sign}&day=TODAY`;
    } else if (type === "weekly") {
      url = `https://horoscope-app-api.vercel.app/api/v1/get-horoscope/weekly?sign=${sign}`;
    } else if (type === "monthly") {
      url = `https://horoscope-app-api.vercel.app/api/v1/get-horoscope/monthly?sign=${sign}`;
    }
    const getZodiacPrediction = await axios.get(url);
    console.log("getZodiacPrediction", getZodiacPrediction);

    return res.status(200).json({
      message: "zodiac Prediction fetched successfully",
      isSuccess: true,
      statusCode: 200,
      data: getZodiacPrediction?.data?.data || [],
    });
  } catch (error) {
    console.error("Error fetching zodiac Prediction:", error);

    return res.status(500).json({
      message: error?.message,
    });
  }
}
exports.zodiacPrediction = zodiacPrediction;
