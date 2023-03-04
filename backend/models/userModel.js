const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    LastName: {
      type: String,
      required: [true, "Please add a Last name"],
    },
    FirstName: {
      type: String,
      required: [true, "Please add a First name"],
    },
    MiddleName: {
      type: String,
      required: false,
    },
    Username: {
      type: String,
      required: [true, "Please add a Username"],
    },
    Password: {
      type: String,
      required: [true, "Please add a Username"],
    },
    Email: {
      type: String,
      required: [true, "Please add a Username"],
    },
    Invoices: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", userSchema);
