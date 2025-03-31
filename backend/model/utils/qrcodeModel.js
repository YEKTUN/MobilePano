const mongoose = require("mongoose");
const commonPropertiesSchema = require("../commonProperties");

const qrcodeSchema = new mongoose.Schema(
  {
    label: { type: String, default: "QR Code" }, 
    subtype: { type: String, default: "" }, 
    choices: { type: String, default: "" }, 

    commonProperties: commonPropertiesSchema, 
  },
  { timestamps: true }
);

module.exports = mongoose.model("QrCode", qrcodeSchema);
