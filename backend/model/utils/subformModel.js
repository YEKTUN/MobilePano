const mongoose = require("mongoose");
const commonPropertiesSchema = require("../commonProperties");

const subformSchema = new mongoose.Schema(
  {
    label: { type: String,  default: "Subform" }, 
    entryMode: { type: String, enum: ["Default", "Inline","Wizard"], default: "Default" }, 

    commonProperties: commonPropertiesSchema, 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subform", subformSchema);
