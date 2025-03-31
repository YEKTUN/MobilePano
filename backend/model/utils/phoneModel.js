const mongoose = require("mongoose");
const commonPropertiesSchema = require("../commonProperties");

const phoneSchema = new mongoose.Schema(
  {
    label: { type: String,  default: "Phone" }, 
    choices: { type: String, default: "" }, 
    inputType: { type: String, enum: ["Phone", "Email", "Address", "Plain Text", "Numeric", "Decimal"], default: "Phone" }, 

    repopulateValue: { type: Boolean, default: false }, 
    onValueEdit: { type: String, default: "" }, 

    otpVerification: { type: Boolean, default: false }, 
    verificationMandatory: { type: Boolean, default: false }, 
    mask: { type: String, enum: ["None", "Date (15/08/1947)", "Hour (12:00)","Date & Hour (15/08/1947 12:00)","ZIP Code (12345-678)","Crazy ZIP Code (1-23-45-67)","Telephone (1234-5678)","Telephone with Code Area ((02) 4021-2265)","US Telephone ((123) 456-7899)","IP Address (127.000.000.001)","Money (1.000,00)",], default: "None" }, 
    saveNumber: { type: Boolean, default: false }, 
    defaultText: { type: String, default: "" }, 

    commonProperties: commonPropertiesSchema, 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Phone", phoneSchema);
