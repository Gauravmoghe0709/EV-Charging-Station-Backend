import axios from "axios";

export const getCoordinatesFromOSM = async (address) => {
  const url = "https://nominatim.openstreetmap.org/search";

  const response = await axios.get(url, {
    params: {
      q: address,
      format: "json",
      limit: 1,
    },
    headers: {
      "User-Agent": process.env.USER_AGENT,
    },
  });

  if (!response.data || response.data.length === 0) {
    throw new Error("Address not found");
  }

  return {
    latitude: parseFloat(response.data[0].lat),
    longitude: parseFloat(response.data[0].lon),
  };
};
