import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const StorySchema = new Schema(
  {
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Profile' },
    characterId: { type: Schema.Types.ObjectId, ref: 'Character' },
    partyId: { type: Schema.Types.ObjectId, ref: 'Party' },
    title: { type: String, required: true, minLength: 2, maxLength: 80 },
    description: { type: String, maxLength: 2000 },
    tags: { type: [String], maxLength: 40 }
  }
)