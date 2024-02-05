"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_entity_1 = require("../entity/user.entity");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserController {
    constructor() {
        this.getAllUsers = async (req, res) => {
            try {
                const users = await req.db.getRepository(user_entity_1.Users).find();
                res.json(users);
            }
            catch (error) {
                console.error('Error fetching users:', error);
                res.status(500).send('Internal Server Error');
            }
        };
        this.getUserById = async (req, res) => {
            const userId = req.params.id;
            try {
                const user = await req.db.getRepository(user_entity_1.Users).findOne({
                    where: {
                        id: userId
                    }
                });
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
                res.json(user);
            }
            catch (error) {
                console.error('Error fetching user by ID:', error);
                res.status(500).send('Internal Server Error');
            }
        };
        this.createUser = async (req, res) => {
            const { name, email, password } = req.body;
            try {
                const hashedPassword = await bcrypt_1.default.hash(password, 10);
                const newUser = req.db.getRepository(user_entity_1.Users).create({
                    name,
                    email,
                    password: hashedPassword,
                });
                await req.db.getRepository(user_entity_1.Users).save(newUser);
                res.status(201).json(newUser);
            }
            catch (error) {
                console.error('Error creating user:', error);
                res.status(500).send('Internal Server Error');
            }
        };
    }
}
exports.default = new UserController();
//# sourceMappingURL=user.controller.js.map