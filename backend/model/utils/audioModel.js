const mongoose = require("mongoose");
const commonPropertiesSchema = require("../commonProperties");


const audioSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
      default: "Audio",
    },
    commonProperties: commonPropertiesSchema, 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Audio", audioSchema);