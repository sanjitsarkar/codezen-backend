const { Schema, model } = require("mongoose");

const codeSchema = new Schema(
  {
    share: { type: Boolean, default: false },
    lang: { type: String, required: [true, "Language is required"] },
    user_id: { type: String, required: [true, "UserID is required"] },
    title: { type: String, required: [true, "Title is required"] },
    code: { type: String },
    format: { type: String, required: [true, "Format is required"] },
  },
  {
    timestamps: true,
  }
);
codeSchema.index({ title: "text", lang: "text" });

const Code = model("Code", codeSchema);

module.exports = Code;
