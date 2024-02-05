"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectRouter = void 0;
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const project_controller_1 = __importDefault(require("../controller/project.controller"));
const { createProject, getAllProject, getProjectById } = project_controller_1.default;
const ProjectAuthRouters = (0, express_1.Router)()
    .use(auth_middleware_1.default)
    .get('/:id', getAllProject)
    .post('/create', createProject);
const ProjectNotAuthRouters = (0, express_1.Router)().get('/', getProjectById).post('/');
exports.ProjectRouter = (0, express_1.Router)()
    .use('/project', ProjectAuthRouters)
    .use('/project', ProjectNotAuthRouters);
//# sourceMappingURL=project.route.js.map