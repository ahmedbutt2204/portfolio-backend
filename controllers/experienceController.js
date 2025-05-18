const Experience = require('../models/Experience');

// @desc    Get all experiences
// @route   GET /api/experience
// @access  Public
exports.getExperiences = async (req, res, next) => {
    try {
        const experiences = await Experience.find().sort({ startDate: -1 }); // Sort by newest first
        res.status(200).json({
            success: true,
            count: experiences.length,
            data: experiences
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single experience by ID
// @route   GET /api/experience/:id
// @access  Public
exports.getExperienceById = async (req, res, next) => {
    try {
        const experience = await Experience.findById(req.params.id);
        if (!experience) {
            const error = new Error(`Experience not found with id of ${req.params.id}`);
            error.statusCode = 404;
            return next(error);
        }
        res.status(200).json({ success: true, data: experience });
    } catch (error) {
        next(error);
    }
};

// @desc    Create new experience
// @route   POST /api/experience
// @access  Private
exports.createExperience = async (req, res, next) => {
    try {
        const experience = await Experience.create(req.body);
        res.status(201).json({
            success: true,
            data: experience
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update experience
// @route   PUT /api/experience/:id
// @access  Private
exports.updateExperience = async (req, res, next) => {
    try {
        let experience = await Experience.findById(req.params.id);
        if (!experience) {
            const error = new Error(`Experience not found with id of ${req.params.id}`);
            error.statusCode = 404;
            return next(error);
        }
        experience = await Experience.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({ success: true, data: experience });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete experience
// @route   DELETE /api/experience/:id
// @access  Private
exports.deleteExperience = async (req, res, next) => {
    try {
        const experience = await Experience.findById(req.params.id);
        if (!experience) {
            const error = new Error(`Experience not found with id of ${req.params.id}`);
            error.statusCode = 404;
            return next(error);
        }
        await experience.deleteOne();
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        next(error);
    }
};