const mongoose = require("mongoose");
const commonPropertiesSchema = require("../commonProperties");

const dateSchema = new mongoose.Schema(
  {
    label: { type: String,  default: "Date" }, 
    datePickerType: { type: String, enum: ["Date", "DateTime","Date Range", "Date time both"], default: "Date" }, 
    allowFuture: { type: Boolean, default: true }, 
    allowPast: { type: Boolean, default: true }, 
    repopulateValue: { type: Boolean, default: false }, 
    dateFormat: { type: String,enum:["MM/dd/YYYY (02/21/2018)","MM/dd/YY (02/21/18)","dd/MM/YYYY (21/02/2018)","dd/MM/YY (21/02/18)"] ,default: "MM/dd/YYYY (02/21/2018)" }, 
    choices: { type: String, default: "" }, 

    commonProperties: commonPropertiesSchema, 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Date", dateSchema);
