import mongoose from "mongoose";
import { defaultSchemaOptions } from "../db/Constants.js";

const Schema = mongoose.Schema

export const PartySchema = new Schema(
  {
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
    dungeonMasterIds: { type: [Schema.Types.ObjectId], ref: 'Account' },
    characterIds: { type: [Schema.Types.ObjectId], ref: 'Character' },
    name: { type: String, required: true, minLength: 2, maxLength: 100 },
    description: { type: String, maxLength: 3000 },
    picture: { type: String, maxLength: 2000 }
  }, defaultSchemaOptions
)

PartySchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})