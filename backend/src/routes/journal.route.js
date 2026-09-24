import { Router } from "express";
import {
    createJournal,
    getAllJournals,
    getJournalById,
    updateJournal,
    deleteJournal
} from "../controllers/journal.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router();


router.route("/")
    .post(verifyJWT, createJournal)
    .get(verifyJWT, getAllJournals);


router.route("/:id")
    .get(verifyJWT, getJournalById)
    .patch(verifyJWT, updateJournal)
    .delete(verifyJWT, deleteJournal);


export default router;