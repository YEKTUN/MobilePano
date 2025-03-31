const mongoose = require("mongoose");
const commonPropertiesSchema = require("../commonProperties");

const emailSchema = new mongoose.Schema(
  {
    label: { type: String, default: "Email" }, 
    inputType: { type: String, enum: ["Email", "Phone", "Address", "Plain Text", "Numeric"], default: "Email" }, 
    
    repopulateValue: { type: Boolean, default: false }, 
    onValueEdit: { type: String, default: "" }, 
    
    allowMultipleEmails: { type: Boolean, default: false }, 
    defaultText: { type: String, default: "" }, 

    commonProperties: commonPropertiesSchema, 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Email", emailSchema);
