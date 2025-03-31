const mongoose = require("mongoose");
const commonPropertiesSchema = require("../commonProperties");

const childrecordSchema = new mongoose.Schema(
  {
    label: { type: String, required: true, default: "Children" }, 
    childForm: { type: String, default: "" }, 
    showInlineList: { type: Boolean, default: false }, 
    recordLimitType: { type: String, default: "" }, 

    commonProperties: commonPropertiesSchema, 
  },
  { timestamps: true }
);

module.exports = mongoose.model("ChildRecord", childrecordSchema);
