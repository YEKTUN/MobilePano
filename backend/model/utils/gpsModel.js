const mongoose = require("mongoose");
const commonPropertiesSchema = require("../commonProperties");

const gpsSchema = new mongoose.Schema(
  {
    label: { type: String,  default: "Location" }, 
    captureType: { type: String, enum: ["Manual", "On Tap","On SuBMİT"], default: "Manual" }, 
    pointSelection: { type: String, enum: ["Show", "Hide"], default: "Show" }, 
    polygonSelection: { type: String, enum: ["Show", "Hide"], default: "Show" }, 
    polylineSelection: { type: String, enum: ["Show", "Hide"], default: "Show" }, 
    mapZoomLevel: { type: Number, default: 15 }, 

    commonProperties: commonPropertiesSchema, 
  },
  { timestamps: true }
);

module.exports = mongoose.model("GPS", gpsSchema);
