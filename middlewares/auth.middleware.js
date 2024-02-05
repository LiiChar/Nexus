"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const WrongAuthenticationTokenException_1 = __importDefault(require("../exception/WrongAuthenticationTokenException"));
const user_entity_1 = require("../entity/user.entity");
const authJWTMiddleware = async (req, res, next) => {
    let auth;
    if (req.cookies && req.cookies.authorization) {
        auth = req.cookies.jwt;
    }
    else if (req.headers.authorization) {
        auth = req.headers.authorization;
    }
    else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const secret = process.env.JWT_SECRET;
    try {
        const verificationResponse = jsonwebtoken_1.default.verify(auth, secret);
        const id = verificationResponse.id;
        const user = await req.db.getRepository(user_entity_1.Users).findOne({
            where: {
                id: id,
            },
        });
        if (user) {
            req.user = user;
            next();
        }
        else {
            next(new WrongAuthenticationTokenException_1.default());
        }
    }
    catch (error) {
        next(new WrongAuthenticationTokenException_1.default());
    }
};
exports.default = authJWTMiddleware;
//# sourceMappingURL=auth.middleware.js.map