const mongoose = require("mongoose");
const commonPropertiesSchema = require("../commonProperties");
const choiceListSchema = new mongoose.Schema(
  {
    label: { type: String, required: true, default: "Choice List" }, 
    dataSource: { type: String, enum: ["Fixed List", "Reference List"], default: "Fixed List" }, 
    choices: { type: String, default: "" }, 
    defaultChoice: { type: String, default: "" }, 
    unit: { type: String, default: "" }, 

    multipleSelection: { type: Boolean, default: false }, 
    allowBarcodeSearch: { type: Boolean, default: false }, 
    repopulateValue: { type: Boolean, default: false }, 

    commonProperties: commonPropertiesSchema,
  },
  { timestamps: true }
);

module.exports = mongoose.model("ChoiceList", choiceListSchema);
