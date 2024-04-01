import mongoose from "mongoose";
import { defaultSchemaOptions } from "../db/Constants.js";

const Schema = mongoose.Schema;

export const ArtSchema = new Schema(
  {
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
    characterId: { type: Schema.Types.ObjectId, ref: 'Character' },
    partyId: { type: Schema.Types.ObjectId, ref: 'Party' },
    title: { type: String, required: true, minLength: 2, MaxLength: 60 },
    description: { type: String, maxLength: 2000 },
    imgUrl: { type: String, required: true, maxLength: 2000 }
  }, defaultSchemaOptions
)

ArtSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Profile',
  justOne: true
})

ArtSchema.virtual('character', {
  localField: 'characterId',
  foreignField: '_id',
  ref: 'Character',
  justOne: true
})

ArtSchema.virtual('party', {
  localField: 'partyId',
  foreignField: '_id',
  ref: 'Party',
  justOne: true
})