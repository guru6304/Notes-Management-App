const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authMiddleware");

const { validateNote } = require("../validators/noteValidator");

const {
    createNote,
    getAllNotes,
    updateNote,
    deleteNote
} = require("../controllers/noteController");

router.post(
    "/",
    authenticateUser,
    validateNote,
    createNote
);

router.get(
    "/",
    authenticateUser,
    getAllNotes
);

router.patch(
    "/:id",
    authenticateUser,
    validateNote,
    updateNote
);

router.delete(
    "/:id",
    authenticateUser,
    deleteNote
);
module.exports = router;