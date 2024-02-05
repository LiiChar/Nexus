"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_entity_1 = require("../entity/user.entity");
class ProjectController {
    constructor() {
        this.registration = async (req, res) => {
            const { name, password } = req.body;
            const rep = req.db.getRepository(user_entity_1.Users);
            try {
                const user_exists = await rep.exists({
                    where: {
                        name,
                    },
                });
                if (user_exists) {
                    return res
                        .status(403)
                        .json({ message: `User with name ${name} exists` });
                }
                const hashedPassword = await bcrypt_1.default.hash(password, 10);
                const { generatedMaps } = await rep.insert({
                    name,
                    password: hashedPassword,
                });
                res.status(200).json(generatedMaps);
            }
            catch (error) {
                console.error('Error fetching projects:', error);
                res.status(500).send('Internal Server Error');
            }
        };
        this.login = async (req, res) => {
            const { name, password } = req.body;
            const rep = req.db.getRepository(user_entity_1.Users);
            try {
                const user = await rep.findOne({
                    where: {
                        name: name,
                    },
                });
                if (user == null) {
                    return res.status(404).json({ message: 'User not found' });
                }
                if (!bcrypt_1.default.compare(password, user.password)) {
                    return res.status(403).json({ message: 'Password is wrong' });
                }
                const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRED_IN });
                res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 });
                res.status(200).json({ token: token });
            }
            catch (error) {
                console.error('Error fetching user by ID:', error);
                res.status(500).send('Internal Server Error');
            }
        };
        this.logout = async (req, res) => {
            res.clearCookie('jwt');
            res.status(200).json({ message: 'User is log-out' });
        };
        this.verificated = async (req, res) => { };
        this.getMe = async (req, res) => {
            res.status(200).json(req.user);
        };
    }
}
exports.default = new ProjectController();
//# sourceMappingURL=auth.controller.js.map