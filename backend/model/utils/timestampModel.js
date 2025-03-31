const mongoose = require("mongoose");
const commonPropertiesSchema = require("../commonProperties");

const timestampSchema = new mongoose.Schema(
  {
    label: { type: String,  default: "Timestamp" }, 
    mode: { type: String, enum: ["On Tap","On Open", "On Submit"], default: "On Tap" }, 
    allowChanging: { type: Boolean, default: false }, 
    dateFormat: { type: String,enum:["MM/dd/YYYY (02/21/2018)","MM/dd/YY (02/21/18)","dd/MM/YYYY (21/02/2018)","dd/MM/YY (21/02/18)"] , default: "MM/dd/YYYY (02/21/2018)" }, 

    commonProperties: commonPropertiesSchema, 
  },
  { timestamps: true }
);

module.exports = mongoose.model("TimeStamp", timestampSchema);
