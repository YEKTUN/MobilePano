const mongoose = require("mongoose");
const commonPropertiesSchema = require("../commonProperties");

const photoSchema = new mongoose.Schema(
  {
    label: { type: String, default: "Photo" }, 
    allowBrowsing: { type: Boolean, default: false }, 
    showTimestamp: { type: Boolean, default: false },
    includeNotes: { type: Boolean, default: false }, 
    generatePublicUrl: { type: Boolean, default: false }, 
    
    photoUrl: { type: String, default: "" },
    notes: { type: String, default: "" }, 

    commonProperties: commonPropertiesSchema,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Photo", photoSchema);
