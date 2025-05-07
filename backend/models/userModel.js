import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [3, "Name should have at least 3 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: {
      validator: function (v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [8, "Password should have at least 8 characters"],
    select: false,
  },
  preferences: {
    sources: {
      type: String,
      default: "timesofindia",
      enum: {
        values: ["timesofindia", "hindu", "bbc", "guardian", "reuters"],
        message: "{VALUE} is not a valid news source!",
      },
    },
    categories: {
      type: [String],
      default: ["politics", "business", "technology", "sports"],
    },
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
