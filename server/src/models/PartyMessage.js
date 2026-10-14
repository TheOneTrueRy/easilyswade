import { Schema } from "mongoose";
import { defaultSchemaOptions } from "../db/Constants.js";

// NOTE one entry in a party's chatroom, either something a player typed or a dice roll
export const PartyMessageSchema = new Schema(
  {
    partyId: { type: Schema.Types.ObjectId, required: true, ref: 'Party' },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
    characterId: { type: Schema.Types.ObjectId, required: true, ref: 'Character' },
    characterName: { type: String, required: true, maxLength: 120 },
    characterPicture: { type: String, maxLength: 2000 },
    type: { type: String, required: true, enum: ['chat', 'roll'] },
    text: { type: String, maxLength: 500 },
    roll: { type: Schema.Types.Mixed }
  }, defaultSchemaOptions
)

PartyMessageSchema.index({ partyId: 1, createdAt: -1 })
