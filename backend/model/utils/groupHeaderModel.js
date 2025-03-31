const mongoose = require("mongoose");
const commonPropertiesSchema = require("../commonProperties");

const groupHeaderSchema = new mongoose.Schema(
  {
    headerTitle: { type: String,  default: "Group Header" },
    stickyGroup: { type: Boolean, default: false }, 
    subtype: { type: String, enum: ["Header", "Label"], default: "Header" }, 
    initialDisplayMode: { type: String, enum: ["Expand", "Collapse"], default: "Expand" },

    commonProperties: commonPropertiesSchema, 
  },
  { timestamps: true }
);

module.exports = mongoose.model("GroupHeader", groupHeaderSchema);
