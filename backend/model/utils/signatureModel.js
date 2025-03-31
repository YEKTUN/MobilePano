const mongoose = require("mongoose");
const commonPropertiesSchema = require("../commonProperties");

const signatureSchema = new mongoose.Schema(
  {
    label: { type: String,  default: "Signature" }, 
    
    note: { type: String, default: "" }, 
    
    commonProperties: commonPropertiesSchema, 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Signature", signatureSchema);
