import mongoose from "mongoose";

const journalSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        content: {
            type: String,
            required: true,
        },

        mood: {
            type: String,
            enum: ["happy", "sad", "angry", "excited", "neutral"],
            default: "neutral",
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Journal = mongoose.model("Journal", journalSchema);