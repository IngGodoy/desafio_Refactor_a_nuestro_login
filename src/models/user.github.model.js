import { Schema, model } from "mongoose";

const userGithubSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    default: "user",
  }
});

export const UserGithubModel = model("UserGithub", userGithubSchema);