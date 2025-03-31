const mongoose = require("mongoose");
const commonPropertiesSchema = require("../commonProperties");
const textSchema = new mongoose.Schema(
  {
    panoId: { type: mongoose.Schema.Types.ObjectId, ref: "Pano" },
    label: { type: String, required: true, default: "Textbox" }, 
    choices: { type: String, default: "" }, 
    inputType: {
      type: String,
      enum: ["Plain Text", "Numeric","Email","Decimal","Address","Phone"],
      default: "Plain Text",
    }, 
    minLength: { type: Number, default: 0 }, 
    maxLength: { type: Number, default: 1000 }, 
    case: { type: String, enum: ["Capital", "Small", "Title"], default: "Title" },
   

    repopulateValue: { type: Boolean, default: false }, 
    onValueEdit: { type: String, default: "" }, 
    isMultiline: { type: Boolean, default: false }, 
    mask: { type: String, default: "None" }, 
    multipleSelection: { type: Boolean, default: false }, 
    defaultText: { type: String, default: "" }, 

    commonProperties: commonPropertiesSchema,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Text", textSchema);
