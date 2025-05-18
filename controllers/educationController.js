const Education = require('../models/Education'); // Import the Education model

// @desc    Get all education entries
// @route   GET /api/education
// @access  Public
exports.getEducations = async (req, res, next) => {
    try {
        const educations = await Education.find().sort({ startDate: -1 }); // Sort by newest first
        res.status(200).json({
            success: true,
            count: educations.length,
            data: educations
        });
    } catch (error) {
        // Pass error to the error handling middleware
        next(error);
    }
};

// @desc    Get single education entry by ID
// @route   GET /api/education/:id
// @access  Public
exports.getEducationById = async (req, res, next) => {
    try {
        const education = await Education.findById(req.params.id);
        if (!education) {
            // Use a custom error object or just a message
            const error = new Error(`Education not found with id of ${req.params.id}`);
            error.statusCode = 404;
            return next(error); // Pass to error handler
        }
        res.status(200).json({ success: true, data: education });
    } catch (error) {
        // Catches errors like invalid ObjectId format
        next(error);
    }
};

// @desc    Create new education entry
// @route   POST /api/education
// @access  Private (assuming you'll add auth later)
exports.createEducation = async (req, res, next) => {
    try {
        const education = await Education.create(req.body);
        res.status(201).json({ // 201 for resource created
            success: true,
            data: education
        });
    } catch (error) {
        // Mongoose validation errors will be caught here
        next(error);
    }
};

// @desc    Update education entry
// @route   PUT /api/education/:id
// @access  Private
exports.updateEducation = async (req, res, next) => {
    try {
        let education = await Education.findById(req.params.id);

        if (!education) {
            const error = new Error(`Education not found with id of ${req.params.id}`);
            error.statusCode = 404;
            return next(error);
        }

        // Add authorization check here later if needed (e.g., ensure user owns this record)

        education = await Education.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // Return the modified document rather than the original
            runValidators: true // Ensure new data meets schema validation
        });

        res.status(200).json({ success: true, data: education });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete education entry
// @route   DELETE /api/education/:id
// @access  Private
exports.deleteEducation = async (req, res, next) => {
    try {
        const education = await Education.findById(req.params.id);

        if (!education) {
            const error = new Error(`Education not found with id of ${req.params.id}`);
            error.statusCode = 404;
            return next(error);
        }

        // Add authorization check here later

        await education.deleteOne(); // or Education.findByIdAndDelete(req.params.id);

        res.status(200).json({ success: true, data: {} }); // Or status 204 (No Content)
    } catch (error) {
        next(error);
    }
};