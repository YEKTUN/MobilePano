const mongoose = require("mongoose");
const commonPropertiesSchema = require("../commonProperties");

const datetimeSchema = new mongoose.Schema(
  {
    label: { type: String,  default: "Date Time" }, 
    datePickerType: { type: String, enum: ["Date time both", "Date", "Time"], default: "Date time both" }, 
    allowFuture: { type: Boolean, default: true }, 
    allowPast: { type: Boolean, default: true }, 
    repopulateValue: { type: Boolean, default: false }, 
    dateTimeFormat: { type: String,enum:["MM/dd/YYYY HH:mm:ss (02/21/2018 12:00:00)","MM/dd/YY HH:mm (02/21/18 12:00)","dd/MM/YYYY HH:mm:ss (21/02/2018 12:00:00)","dd/MM/YY HH:mm (21/02/18 12:00)"] , default: "MM/dd/YYYY HH:mm:ss (02/21/2018 12:00:00)" }, 
    choices: { type: String, default: "" }, 

    commonProperties: commonPropertiesSchema, 
  },
  { timestamps: true }
);

module.exports = mongoose.model("DateTime", datetimeSchema);
