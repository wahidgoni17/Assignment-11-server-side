const mongoose = require("mongoose");

const gallerySchema = mongoose.Schema(
  { photoUrl: String },
  { collection: "gallery" }
);

const Gallery = new mongoose.model("Gallery", gallerySchema);

module.exports = Gallery;
