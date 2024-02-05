"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const user_controller_1 = __importDefault(require("../controller/user.controller"));
const { createUser, getAllUsers, getUserById } = user_controller_1.default;
const UserAuthRouters = (0, express_1.Router)()
    .use(auth_middleware_1.default)
    .get('/:id', getUserById)
    .post('/create', createUser);
const UserNotAuthRouters = (0, express_1.Router)().get('/', getAllUsers).post('/');
exports.UserRouter = (0, express_1.Router)()
    .use('/user', UserAuthRouters)
    .use('/user', UserNotAuthRouters);
//# sourceMappingURL=user.route.js.map