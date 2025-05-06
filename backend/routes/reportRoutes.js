const express = require('express');
const { protect, adminOnly } = require('../middlewares/authMiddleware'); // Middleware to protect routes
const { exportTasksReport, exportUsersReport } = require('../controllers/reportController'); // Import report controller functions

const router = express.Router();

router.get("/export/tasks", protect, adminOnly, exportTasksReport); // Export all tasks as Excel/PDF
router.get("/export/users", protect, adminOnly, exportUsersReport); // Export user-task report

module.exports = router;