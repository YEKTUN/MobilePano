const mongoose = require("mongoose");
const commonPropertiesSchema = require("../commonProperties");
const barcodeSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
      default: "Barcode",
    },
    subtype: {
      type: String,
      enum:["Default","Scan With Location"],
      default: "Default",
    },
    textEditable: {
      type: Boolean,
      default: false,
    },
    scanQRCodes: {
      type: Boolean,
      default: false,
    },
    deviceProfiles: {
      type: [String],
      default: [],
    },
    defaultDeviceProfile: {
      type: String,
      default: "Build In Camera",
    },
    multipleSelection: {
      type: Boolean,
      default: false,
    },
    choices: {
      type: String,
      default: "",
    },
    commonProperties: commonPropertiesSchema, 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Barcode", barcodeSchema);