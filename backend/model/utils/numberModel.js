const mongoose = require("mongoose");
const commonPropertiesSchema = require("../commonProperties");

const numberSchema = new mongoose.Schema(
  {
    label: { type: String,  default: "Number" }, 
    choices: { type: String, default: "" }, 
    inputType: { type: String, enum: ["Numeric", "Phone", "Email", "Address", "Plain Text", "Decimal"], default: "Numeric" }, 
    
    repopulateValue: { type: Boolean, default: false }, 
    onValueEdit: { type: String, default: "" }, 
    
    minNumber: { type: Number, default: 0 }, 
    maxNumber: { type: Number, default: 999999 }, 
    unit: { type: String, default: "" }, 
    defaultText: { type: String, default: "" }, 

    commonProperties: commonPropertiesSchema, 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Number", numberSchema);
