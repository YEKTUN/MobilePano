const mongoose = require("mongoose");
const commonPropertiesSchema = require("../commonProperties");

const documentSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      default: "Document",
    },
    allowedFileType: {
      type: String,
      enum:["pdf", "docx", "doc", "xls", "xlsx", "ppt"],
      default: "pdf",
    },
    fileSizeLimit: {
      type: Number,
      default: 0,
    },
    generatePublicURL: {
      type: Boolean,
      default: false,
    },
    commonProperties: commonPropertiesSchema, 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Document", documentSchema);