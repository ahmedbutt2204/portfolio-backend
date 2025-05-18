const mongoose = require('mongoose');

const EducationSchema = new mongoose.Schema({
    school: {
        type: String,
        required: [true, 'Please add a school name'],
        trim: true
    },


    degree: {
        type: String,
        required: [true, 'Please add a degree or certification'],
        trim: true  
    },

    fieldOfStudy: {
        type: String,
        trim: true
    },
    startDate: {
        type: Date,
        required: [true, 'Please add a start date']
    },
    endDate: {
        type: Date // Can be null if currently pursuing
    },
    current: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        trim: true // Optional details about the education
    }
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps
});

// Middleware to handle logic for 'current' and 'endDate'
// If 'current' is true, 'endDate' should ideally be null or not set.
// If 'current' is false, 'endDate' should ideally be set.
// This pre-save hook helps enforce some of this logic.
EducationSchema.pre('save', function(next) {
    if (this.current && this.endDate) {
        // If current is true, endDate should not have a past value.
        // For simplicity here, if current is true, we can nullify endDate.
        // A more robust validation might check if endDate is in the future or allow it.
        this.endDate = undefined; // Mongoose treats undefined as "not set"
    }
    // If it's not current, an endDate is usually expected.
    // Your assignment doesn't explicitly state validation for this,
    // so we'll keep it simple. The 'required' on startDate is more critical.
    next();
});

module.exports = mongoose.model('Education', EducationSchema);