const Skill = require('../models/Skill');

// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
exports.getSkills = async (req, res, next) => {
    try {
        const skills = await Skill.find().sort({ category: 1, name: 1 }); // Sort by category then name
        res.status(200).json({
            success: true,
            count: skills.length,
            data: skills
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single skill by ID
// @route   GET /api/skills/:id
// @access  Public
exports.getSkillById = async (req, res, next) => {
    try {
        const skill = await Skill.findById(req.params.id);
        if (!skill) {
            const error = new Error(`Skill not found with id of ${req.params.id}`);
            error.statusCode = 404;
            return next(error);
        }
        res.status(200).json({ success: true, data: skill });
    } catch (error) {
        next(error);
    }
};

// @desc    Create new skill
// @route   POST /api/skills
// @access  Private
exports.createSkill = async (req, res, next) => {
    try {
        const skill = await Skill.create(req.body);
        res.status(201).json({
            success: true,
            data: skill
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update skill
// @route   PUT /api/skills/:id
// @access  Private
exports.updateSkill = async (req, res, next) => {
    try {
        let skill = await Skill.findById(req.params.id);
        if (!skill) {
            const error = new Error(`Skill not found with id of ${req.params.id}`);
            error.statusCode = 404;
            return next(error);
        }
        skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({ success: true, data: skill });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete skill
// @route   DELETE /api/skills/:id
// @access  Private
exports.deleteSkill = async (req, res, next) => {
    try {
        const skill = await Skill.findById(req.params.id);
        if (!skill) {
            const error = new Error(`Skill not found with id of ${req.params.id}`);
            error.statusCode = 404;
            return next(error);
        }
        await skill.deleteOne();
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        next(error);
    }
};