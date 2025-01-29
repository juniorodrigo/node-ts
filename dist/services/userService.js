"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = exports.getUser = exports.getAllUsers = void 0;
const users = [];
const getAllUsers = async () => {
    return users;
};
exports.getAllUsers = getAllUsers;
const getUser = async (id) => {
    return users.find((user) => user.id === id);
};
exports.getUser = getUser;
const addUser = async (user) => {
    users.push(user);
    return user;
};
exports.addUser = addUser;
