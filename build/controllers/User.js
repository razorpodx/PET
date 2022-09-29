"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const readAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find();
        res.status(200).json(users);
    }
    catch (error) {
        next(error);
    }
});
const readUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userid } = req.params;
        const user = yield User_1.default.findById(userid);
        if (!user) {
            return res.status(404).json({ message: 'User Not Found' });
        }
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
});
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const user = yield User_1.default.create({ name });
        res.status(201).json(user);
    }
    catch (error) {
        next(error);
    }
});
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userid } = req.params;
        const { name } = req.body;
        const user = yield User_1.default.findByIdAndUpdate(userid, { name }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User Not Found' });
        }
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
});
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userid } = req.params;
        const user = yield User_1.default.findByIdAndDelete(userid);
        if (!user) {
            return res.status(404).json({ message: 'User Not Found' });
        }
        res.status(204).json({ message: 'User Deleted' });
    }
    catch (error) {
        next(error);
    }
});
const updateOrInsertUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userid } = req.params;
        const { name } = req.body;
        const user = yield User_1.default.findByIdAndUpdate(userid, { name }, { new: true, upsert: true });
        if (!user) {
            return res.status(404).json({ message: 'User Not Found' });
        }
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.default = { readAll, readUser, createUser, updateUser, deleteUser, updateOrInsertUser };
