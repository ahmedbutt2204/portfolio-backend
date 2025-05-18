const express = require('express');
const router = express.Router();

// Import controller functions
const {
    getEducations,
    getEducationById,
    createEducation,
    updateEducation,
    deleteEducation
} = require('../controllers/educationController'); // We will create this controller next

// Define routes for /api/education
router.route('/')
    .get(getEducations)       // GET /api/education - Get all education records
    .post(createEducation);   // POST /api/education - Create a new education record

router.route('/:id')
    .get(getEducationById)    // GET /api/education/:id - Get a single education record
    .put(updateEducation)     // PUT /api/education/:id - Update an education record
    .delete(deleteEducation); // DELETE /api/education/:id - Delete an education record

module.exports = router;