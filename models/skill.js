const mongoose = require("mongoose");
// const validator = require("validator");

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [1, "Минимальная длинна 1 символа"],
      maxlength: [30, "Максимальная длинна 30 символов"],
    },
  },
  { versionKey: false, timestamps: true },
);

module.exports = mongoose.model("skill", skillSchema);
