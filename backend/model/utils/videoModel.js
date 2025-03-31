const mongoose = require("mongoose");
const commonPropertiesSchema = require("../commonProperties");

const videoSchema = new mongoose.Schema(
  {
    label: {
      type: String,
    
      default: "Video",
    },
    commonProperties: commonPropertiesSchema,
  },

  { timestamps: true }
);
module.exports = mongoose.model("Video", videoSchema);
