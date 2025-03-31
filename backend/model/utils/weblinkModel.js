const mongoose = require("mongoose");
const commonPropertiesSchema = require("../commonProperties");


const weblinkSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      
      default: "Web Link",
    },
    targetURL: {
      type: String,
     
      default: "http://www.google.com",
    },
    commonProperties: commonPropertiesSchema, 

  },
  { timestamps: true }
);

module.exports = mongoose.model("WebLink", weblinkSchema);