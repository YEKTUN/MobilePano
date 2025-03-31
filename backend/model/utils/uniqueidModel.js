const mongoose = require("mongoose");
const commonPropertiesSchema = require("../commonProperties");


const uniqueidSchema = new mongoose.Schema(
  {
    label: {
      type: String,
     
      default: "Unique ID",
    },
    prefix: {
      type: String,
      default: "",
    },
    commonProperties: commonPropertiesSchema, 

  },
  { timestamps: true }
);

module.exports = mongoose.model("UniqueId", uniqueidSchema);