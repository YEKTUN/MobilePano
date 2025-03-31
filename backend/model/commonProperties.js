const mongoose = require("mongoose");

const commonPropertiesSchema = new mongoose.Schema(
  {
    uniqueIdentifier: { type: String, required: true, unique: true },
    shortName: { type: String, default: "" },
    placeholder: { type: String, default: "Enter your response" },
    required: { type: Boolean, default: false },

    hidden: { type: Boolean, default: false },
    searchable: { type: Boolean, default: false },
    valueDisplayMode: {
      type: String,
      enum: ["Editable", "Readonly"],
      default: "Editable",
    },
    fontSize: {
      type: String,
      enum: ["Small", "Medium", "Large"],
      default: "Medium",
    },
    unique: { type: Boolean, default: false },
    increaseIndent: { type: Number, default: 0 },
    helpMode: {
      type: String,
      enum: ["Collapse", "Expanded"],
      default: "Collapse",
    },

    copyField: { type: Boolean, default: false },
    onValueChange: { type: String, default: "" },
    stickyField: { type: Boolean, default: false },
    padding: { type: Number, default: 0 },
    margin: { type: Number, default: 0 },
  },
  { _id: false }
);

module.exports = commonPropertiesSchema;
