const mongoose = require("mongoose");
const commonPropertiesSchema = require("../commonProperties");
const counterSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      
    },
    unit: {
      type: String,
     
    },
    commonProperties: commonPropertiesSchema, 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Counter", counterSchema);