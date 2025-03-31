const mongoose = require("mongoose");
const commonPropertiesSchema = require("../commonProperties");

const timeSchema = new mongoose.Schema(
  {
    panoId: { type: mongoose.Schema.Types.ObjectId, ref: "Pano" },
    label: { type: String, required: true, default: "Time" }, 
    datePickerType: { type: String, enum: ["Time","Date","Date time both","Date Range"], default: "Time" }, 
    repopulateValue: { type: Boolean, default: false }, 
    timeFormat: { type: String,enum:["HH:mm:ss (12:00:00)","HH:mm (12:00)","Other"], default: "HH:mm:ss (12:00:00)" }, 
    choices: { type: String, default: "" }, 

    commonProperties: { type: commonPropertiesSchema, default: () => ({}) },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Time", timeSchema);
