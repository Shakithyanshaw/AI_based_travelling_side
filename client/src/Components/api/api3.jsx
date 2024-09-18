import axios from 'axios';

// const URL = "https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary";
const URL =
  'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';

export const getLocationInfo = async (sw, ne) => {
  try {
    // Axios GET request to the specified URL
    const {
      data: { data },
    } = await axios.get(URL, {
      // Parameters for the request based on the southwest (sw) and northeast (ne) coordinates
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
      },
      // Headers required for the RapidAPI
      headers: {
        'X-RapidAPI-Key': '15a1a0268dmsh1dd7ff4b8477eb1p14bb0bjsn8408f4a52c39',
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
      },
    });
    // Return the data from the response
    return data;
  } catch (e) {
    // Log any errors that occur during the request
    console.log(e);
  }
};
