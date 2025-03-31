const mongoose = require("mongoose");

const panoSchema = new mongoose.Schema(
  {
    panoName: {
      type: String,
      required: true,
      unique: true,
    },
    components: [
      {
        refId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          refPath: "components.type",
        },
        type: {
          type: String,
          required: true,
          enum: [
            "Audio",
            "Barcode",
            "ChildRecord",
            "ChoiceList",
            "Counter",
            "Date",
            "DateRange",
            "DateTime",
            "Decimal",
            "Document",
            "Email",
            "FaceVerification",
            "GPS",
            "GroupHeader",
            "MultiLineText",
            "Number",
            "Phone",
            "Photo",
            "QrCode",
            "Signature",
            "Stopwatch",
            "Subform",
            "Text",
            "Time",
            "TimeStamp",
            "Toggle",
            "UniqueId",
            "Video",
            "WebLink",
          ],
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pano", panoSchema);
