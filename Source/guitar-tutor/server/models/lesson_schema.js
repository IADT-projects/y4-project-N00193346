const { Schema, model } = require("mongoose");

const lessonSchema = Schema(
  {
    instructor: { type: String, required: [true, "artist field is required"] },
    student: {
      type: String,
      required: [true, "song name field is required"],
    },
    time: { type: String, required: [true, "city field is required"] },
    date: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Lesson", lessonSchema);
