const Project = require('../models/Project');

//Post
const createProject = async (req, res) => {

    try {

        const project = await Project.create(req.body);
        res.status(201).send({ success: true, data: project });

    } catch (err) {

        res.status(400).send({ success: false, message: err.message });

    }
}

//get projects ALl for admin
const getAllProjects = async (req, res) => {
    try {

        const projects = await Project.find().sort({ order: 1 });

        if (!projects) {
            res.status(404).send({ success: false, message: "Projects Not Found" });
        }

        res.status(200).send({ success: true, count: projects.length, data: projects });


    } catch (err) {
        res.status(400).send({ success: false, message: err.message });

    }
}

//ProjectByID
const getProjectById = async (req, res) => {
    try {

        const project = await Project.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } }, { new: true });

        if (!project) {
            res.status(404).send({ success: false, message: "Projects Not Found" });
        }

        res.status(200).send({ success: true, data: project });

    } catch (err) {
        res.status(400).send({ success: false, message: err.message });

    }
}

//put->update Project/:id

const updateProject = async (req, res) => {
    try {

        const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!project) {
            res.status(404).send({ success: false, message: "Project Not Found" });
        }

        res.status(200).send({
            success: true,
            message: "Project updated successfully",
            data: project
        });



    } catch (err) {
        res.status(400).send({ success: false, message: err.message });
    }
}


// Delete /project/id

const deleteProject = async (req, res) => {
    try {

        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) {
            res.status(404).send({ success: false, message: "Project Not Found" });
        }

        res.status(200).send({ success: true, data: {} });




    } catch (err) {
        res.status(400).send({ success: false, message: err.message });

    }
}

//Public koo..
const getPublicProjects = async (req, res) => {

    try {
        const projects = await Project.find({ status: 'live' }).sort({ order: 1 });

        res.status(200).send({ success: true, count: projects.length, data: projects });

    } catch (err) {

        res.status(500).send({ success: false, message: err.message });

    }
};

module.exports = { createProject, getAllProjects, getProjectById, updateProject, deleteProject, getPublicProjects }





