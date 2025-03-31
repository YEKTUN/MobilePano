const mongoose = require("mongoose");
const commonPropertiesSchema = require("../commonProperties");

const faceverificationSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      
      default: "Face Verification",
    },
    commonProperties: commonPropertiesSchema,
  },

  { timestamps: true }
);
module.exports = mongoose.model("FaceVerification", faceverificationSchema);
