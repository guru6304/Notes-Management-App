const validateNote = (req, res, next) => {
    const title = req.body.title?.trim();
    const description = req.body.description?.trim();

    if (!title || !description) {
        const error = new Error("Title and Description are required");
        error.statusCode = 400;
        return next(error);
    }
    req.body.title = title;
    req.body.description = description;

    next();
};
module.exports = {
    validateNote
};