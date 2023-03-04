const mongoose = require("mongoose");

const invoiceSchema = mongoose.Schema(
  {
    invoiceNumber: { type: Number, default: 0 },
    UploaderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    CustomerName: {
      type: String,
    },
    Product: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("invoice", invoiceSchema);
