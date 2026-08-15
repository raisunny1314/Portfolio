const express = require('express');
const router = express.Router();

const { createProject, getAllProjects, getProjectById, updateProject, deleteProject, getPublicProjects } = require('../controllers/projectController')
const adminMiddleware = require('../middleware/adminMiddleware');


//Public routes
router.get('/projects', getPublicProjects);
router.get('/projects/:id', getProjectById);

//admin Routes
router.get('/admin/projects',adminMiddleware, getAllProjects);
router.post('/admin/projects',adminMiddleware, createProject);
router.put('/admin/projects/:id',adminMiddleware, updateProject);
router.delete('/admin/projects/:id',adminMiddleware, deleteProject);





module.exports = router;



