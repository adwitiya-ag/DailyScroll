import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Journal } from "../models/journal.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const createJournal = asyncHandler(async (req, res) => {
    // get journal details from frontend
    // validation
    // create journal entry
    // return response

    const { title, content, mood } = req.body;

    if (!title?.trim()) {
        throw new ApiError(400, "Title is required");
    }

    if (!content?.trim()) {
        throw new ApiError(400, "Content is required");
    }

    const journal = await Journal.create({
        title,
        content,
        mood,
        user: req.user._id
    });

    if (!journal) {
        throw new ApiError(500, "Something went wrong while creating journal entry");
    }

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                journal,
                "Journal entry created successfully"
            )
        );
});


const getAllJournals = asyncHandler(async (req, res) => {

    const journals = await Journal.find({
        user: req.user._id
    }).sort({ createdAt: -1 });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                journals,
                "Journal entries fetched successfully"
            )
        );
});


const getJournalById = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const journal = await Journal.findOne({
        _id: id,
        user: req.user._id
    });

    if (!journal) {
        throw new ApiError(404, "Journal entry not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                journal,
                "Journal entry fetched successfully"
            )
        );
});


const updateJournal = asyncHandler(async (req, res) => {

    const { id } = req.params;
    const { title, content, mood } = req.body;

    if (!title?.trim() && !content?.trim() && !mood) {
        throw new ApiError(400, "At least one field is required to update");
    }

    const journal = await Journal.findOne({
        _id: id,
        user: req.user._id
    });

    if (!journal) {
        throw new ApiError(404, "Journal entry not found");
    }

    if (title !== undefined) {
        journal.title = title;
    }

    if (content !== undefined) {
        journal.content = content;
    }

    if (mood !== undefined) {
        journal.mood = mood;
    }

    await journal.save();

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                journal,
                "Journal entry updated successfully"
            )
        );
});


const deleteJournal = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const journal = await Journal.findOne({
        _id: id,
        user: req.user._id
    });

    if (!journal) {
        throw new ApiError(404, "Journal entry not found");
    }

    await Journal.findByIdAndDelete(id);

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Journal entry deleted successfully"
            )
        );
});


export {
    createJournal,
    getAllJournals,
    getJournalById,
    updateJournal,
    deleteJournal
};