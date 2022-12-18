import Venue from "../models/Venue.js";
import User from "../models/User.js";

/* READ */
export const getAllVenue = async (req, res) => {
  try {
    const venue = await Venue.find();
    res.status(200).json(venue);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getAllVenueByUser = async (req, res) => {
  try {
    const { username } = req.params;
    const venue = await Venue.find({ username });
    res.status(200).json(venue);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


