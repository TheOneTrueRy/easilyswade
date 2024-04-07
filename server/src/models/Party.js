import mongoose from "mongoose";
import { defaultSchemaOptions } from "../db/Constants.js";

const Schema = mongoose.Schema

export const PartySchema = new Schema(
  {
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
    dungeonMasterIds: { type: [Schema.Types.ObjectId], ref: 'Account' },
    playerCharacterIds: { type: [Schema.Types.ObjectId], ref: 'Character' },
    nonPlayerCharacterIds: { type: [Schema.Types.ObjectId], ref: 'Character' },
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

PartySchema.virtual('dungeonMasters', {
  localField: 'dungeonMasterId',
  foreignField: '_id',
  ref: 'Account',
  justOne: false
})

PartySchema.virtual('characters', {
  localField: 'playerCharacterIds',
  foreignField: '_id',
  ref: 'Character',
  justOne: false
})

PartySchema.virtual('npcs', {
  localField: 'nonPlayerCharacterIds',
  foreignField: '_id',
  ref: 'Character',
  justOne: false
})