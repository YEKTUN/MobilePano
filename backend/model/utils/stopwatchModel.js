const mongoose = require("mongoose");
const commonPropertiesSchema = require("../commonProperties");

const stopwatchSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      default: "Stopwatch",
    },
    allowPausing: {
      type: Boolean,
      
      default: false, 
    },
    commonProperties: commonPropertiesSchema, 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Stopwatch", stopwatchSchema);