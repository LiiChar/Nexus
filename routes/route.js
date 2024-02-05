"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = void 0;
const express_1 = require("express");
const project_route_1 = require("./project.route");
const user_route_1 = require("./user.route");
const auth_route_1 = require("./auth.route");
exports.route = (0, express_1.Router)()
    .use('/api', project_route_1.ProjectRouter)
    .use('/api', auth_route_1.AuthRouter)
    .use('/api', user_route_1.UserRouter);
//# sourceMappingURL=route.js.map