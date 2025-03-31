const mongoose = require("mongoose");
const commonPropertiesSchema = require("../commonProperties");

const daterangeSchema = new mongoose.Schema(
  {
    label: { type: String,  default: "Date Range" }, 
    datePickerType: { type: String, enum: ["Date Range", "Date time both","Date"], default: "Date Range" }, 
    labelForStartingDate: { type: String, default: "From" }, 
    labelForEndingDate: { type: String, default: "To" }, 
    repopulateValue: { type: Boolean, default: false }, 
    choices: { type: String, default:"" }, 

    commonProperties: commonPropertiesSchema, 
  },
  { timestamps: true }
);

module.exports = mongoose.model("DateRange", daterangeSchema);
