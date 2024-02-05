"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controller/auth.controller"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const { getMe, login, logout, registration, verificated } = auth_controller_1.default;
const AuthRouters = (0, express_1.Router)()
    .post('/login', login)
    .post('/register', registration);
const NotAuthRouters = (0, express_1.Router)()
    .use(auth_middleware_1.default)
    .get('/getme', getMe)
    .get('/logout', logout)
    .get('/verify', verificated);
exports.AuthRouter = (0, express_1.Router)()
    .use('/auth', AuthRouters)
    .use('/auth', NotAuthRouters);
//# sourceMappingURL=auth.route.js.map