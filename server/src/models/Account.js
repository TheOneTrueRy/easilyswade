import mongoose from 'mongoose'
import { defaultSchemaOptions } from "../db/Constants.js"
const Schema = mongoose.Schema

export const ProfileSchema = new Schema(
  {
    name: { type: String, required: true, maxLength: 200 },
    picture: { type: String },
    description: { type: String, maxLength: 3000 }
  }, defaultSchemaOptions
)

export const AccountSchema = new Schema(
  {
    subs: [{ type: String, unique: true }],
    email: { type: String, lowercase: true, unique: true },
    name: { type: String, required: true },
    picture: { type: String },
    description: { type: String, maxLength: 3000 }
    // NOTE If you wish to add additional properties do so here
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

