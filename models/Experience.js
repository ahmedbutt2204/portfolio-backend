const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
    title: { // Job title
        type: String,
        required: [true, 'Please add a job title'],
        trim: true
    },
    company: {
        type: String,
        required: [true, 'Please add a company name'],
        trim: true
    },
    location: {
        type: String,
        trim: true
    },
    startDate: {
        type: Date,
        required: [true, 'Please add a start date']
    },
    endDate: { // Can be null if current job
        type: Date
    },
    current: {
        type: Boolean,
        default: false
    },
    description: { // Responsibilities, achievements
        type: String,
        required: [true, 'Please add a description of your role and responsibilities']
    }
}, {
    timestamps: true
});

ExperienceSchema.pre('save', function(next) {
    if (this.current && this.endDate) {
        this.endDate = undefined;
    }
    next();
});

module.exports = mongoose.model('Experience', ExperienceSchema);