const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a skill name'],
        trim: true,
        unique: true // Assuming skill names should be unique
    },
    level: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'], // Example proficiency levels
        required: [true, 'Please specify skill level']
    },
    category: { // Optional: e.g., 'Programming Language', 'Framework', 'Tool', 'Soft Skill'
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Skill', SkillSchema);