
 const addressToCoords = async (req, res) => {
  const { address } = req.query;

  if (!address) {
    return res.status(400).json({ message: "Address is required" });
  }

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`,
      {
        headers: {
          "User-Agent": "EVConnect-App/1.0",
        },
      }
    );

    const data = await response.json();

    if (!data.length) {
      return res.status(404).json({ message: "Location not found" });
    }

    res.status(200).json({
      latitude: Number(data[0].lat),
      longitude: Number(data[0].lon),
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to convert address" });
  }
};

module.exports = addressToCoords
