"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const project_entity_1 = require("../entity/project.entity");
class ProjectController {
    constructor() {
        this.getAllProject = async (req, res) => {
            try {
                const projects = await req.db.getRepository(project_entity_1.Projects).find();
                res.json(projects);
            }
            catch (error) {
                console.error('Error fetching projects:', error);
                res.status(500).send('Internal Server Error');
            }
        };
        this.getProjectById = async (req, res) => {
            const projectId = req.params.id;
            try {
                const project = await req.db.getRepository(project_entity_1.Projects).findOne({
                    where: {
                        id: projectId,
                    },
                });
                if (!project) {
                    return res.status(404).json({ message: 'User not found' });
                }
                res.json(project);
            }
            catch (error) {
                console.error('Error fetching user by ID:', error);
                res.status(500).send('Internal Server Error');
            }
        };
        this.createProject = async (req, res) => {
            const { title, description } = req.body;
            try {
                const newUser = req.db.getRepository(project_entity_1.Projects).create({
                    title,
                    description,
                    leader_id: req.user.id,
                });
                await req.db.getRepository(project_entity_1.Projects).save(newUser);
                res.status(201).json(newUser);
            }
            catch (error) {
                console.error('Error creating user:', error);
                res.status(500).send('Internal Server Error');
            }
        };
    }
}
exports.default = new ProjectController();
//# sourceMappingURL=project.controller.js.map