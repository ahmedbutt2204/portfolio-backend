const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a project title'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please add a project description']
    },
    technologies: { // Array of strings for tech used
        type: [String],
        required: [true, 'Please list technologies used']
    },
    projectUrl: { // Link to live project
        type: String,
        match: [
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            'Please use a valid URL with HTTP or HTTPS'
        ]
    },
    repositoryUrl: { // Link to code repository (e.g., GitHub)
        type: String,
        match: [
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            'Please use a valid URL with HTTP or HTTPS'
        ]
    },
    startDate: {
        type: Date
    },
    endDate: { // Can be ongoing
        type: Date
    },
    image: { // URL to a project image/screenshot
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Project', ProjectSchema);