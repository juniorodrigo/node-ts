"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUserById = exports.getUsers = void 0;
const userService_1 = require("../services/userService");
const getUsers = async (req, res) => {
    try {
        const users = await (0, userService_1.getAllUsers)();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving users" });
    }
};
exports.getUsers = getUsers;
const getUserById = async (req, res) => {
    try {
        const user = await (0, userService_1.getUser)(req.params.id);
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(404).json({ message: "User not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving user" });
    }
};
exports.getUserById = getUserById;
const createUser = async (req, res) => {
    try {
        const newUser = await (0, userService_1.addUser)(req.body);
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating user" });
    }
};
exports.createUser = createUser;
