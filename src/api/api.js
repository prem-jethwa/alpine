import { BASE_URI } from "../config";
const { REACT_APP_IP_KEY } = process.env;

// HELPERS
const _getRequest = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok)
      throw new Error({ type: "error", message: response.statusText });

    const data = await response.json();

    if (data.statusText !== "OK" && data.status > 400 && data.status < 500)
      throw new Error(data);
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const ipLookUp = async () => {
  try {
    const res = await fetch(`https://ipinfo.io?token=${REACT_APP_IP_KEY}`);
    const data = await res.json();

    return data.city;
  } catch (err) {
    return { type: "iplookupfail", message: "IP Look Up fail!" };
  }
};

const _getLocation = () =>
  new Promise((resolve, reject) => {
    if (!navigator.geolocation)
      reject({
        type: "noSupport",
        message: "Your Browser Does not Support Geolocation",
      });
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        resolve(location);
      },
      (err) => reject(err)
    );
  });

// API
export const getCurrWeatherData = async (lat, lon) => {
  const data = await _getRequest(`${BASE_URI}weather?lat=${lat}&lon=${lon}`);

  // console.log("currWeather: ", data);
  return data;
};

export const getCurrWeatherDataWithTerm = async (term) => {
  const data = await _getRequest(`${BASE_URI}weather?q=${term}`);

  // console.log("currWeatherWithTern: ", data);
  return data;
};

export const getGeolocation = async () => {
  try {
    return await _getLocation();
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

export const getNews = async () => {
  try {
    const data = await _getRequest(`${BASE_URI}weather/news`);

    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const testReq = async () => {
  const data = await _getRequest(`${BASE_URI}weather?q=mumbai`);

  return data;
};
