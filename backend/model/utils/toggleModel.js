const mongoose = require("mongoose");
const commonPropertiesSchema = require("../commonProperties");

const toggleSchema = new mongoose.Schema(
  {
    label: { type: String,  default: "Toggle" }, 
    defaultValue: { type: Boolean, default: false }, 

    commonProperties: commonPropertiesSchema, 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Toggle", toggleSchema);
