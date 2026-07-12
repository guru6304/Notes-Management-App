const pool = require("../config/db");
const createNote = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        const userId = req.user.id;
        await pool.query ("INSERT INTO notes (title,description,user_id) VALUES(?,?,?)",
            [title, description, userId]
        );
        res.status(201).json({
            success: true,
            message: "Note Created Successfully"
        });
    }
    catch (error) {
        next(error);
    }
};

const getAllNotes = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const [notes] = await pool.query
        ("SELECT * FROM notes WHERE user_id=? ORDER BY created_at DESC",
            [userId]
        );
        res.status(200).json({
            success: true,
            count: notes.length,
            notes
        });
    }
    catch (error) {
        next(error);
    }
};

const updateNote = async (req, res, next) => {
    try {
        const noteId = req.params.id;
        const userId = req.user.id;
        const { title, description } = req.body;
        const [result] = await pool.query("UPDATE notes SET title=?,description=? WHERE id=? AND user_id=?",
            [title,description,noteId,userId]
        );
        if (result.affectedRows === 0) {
            const error = new Error("Note Not Found");
            error.statusCode = 404;
            return next(error);
        }
        res.status(200).json({
            success: true,
            message: "Note Updated Successfully"
        });
    }
    catch (error) {
        next(error);
    }
};

const deleteNote = async (req, res, next) => {
    try {
        const noteId = req.params.id;
        const userId = req.user.id;
        const [result] = await pool.query( "DELETE FROM notes WHERE id=? AND user_id=?",
            [noteId, userId]
        );
        if (result.affectedRows === 0) {
            const error = new Error("Note Not Found");
            error.statusCode = 404;
            return next(error);
        }
        res.status(200).json({
            success: true,
            message: "Note Deleted Successfully"
        });
    }
    catch (error) {
        next(error);
    }
};
module.exports = {
    createNote,
    getAllNotes,
    updateNote,
    deleteNote
};