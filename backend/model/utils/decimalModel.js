const mongoose = require("mongoose");
const commonPropertiesSchema = require("../commonProperties");

const decimalSchema = new mongoose.Schema(
  {
    label: { type: String,  default: "Decimal" }, 
    choices: { type: String, default: "" }, 
    inputType: { type: String, enum: ["Decimal","Numeric","Phone","Email","Address","Plain Text"], default: "Decimal" },

    repopulateValue: { type: Boolean, default: false }, 
    onValueEdit: { type: String, default: "" }, 
    
    decimalPlaces: { type: Number, default: 2 }, 
    unit: { type: String, default: "" }, 
    defaultText: { type: String, default: "" }, 

    commonProperties: commonPropertiesSchema,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Decimal", decimalSchema);
