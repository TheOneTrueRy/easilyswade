import { Schema } from "mongoose";
import { defaultSchemaOptions } from "../db/Constants.js";

export const PartyInviteSchema = new Schema(
  {
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
    receiverId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
    partyId: { type: Schema.Types.ObjectId, required: true, ref: 'Party' },
    characterId: { type: Schema.Types.ObjectId, required: true, ref: 'Character' },
    seen: { type: Boolean, required: true, default: false }
  }, defaultSchemaOptions
)

PartyInviteSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
}
)

PartyInviteSchema.virtual('party', {
  localField: 'partyId',
  foreignField: '_id',
  ref: 'Party',
  justOne: true
}
)

PartyInviteSchema.virtual('character', {
  localField: 'characterId',
  foreignField: '_id',
  ref: 'Character',
  justOne: true
}
)