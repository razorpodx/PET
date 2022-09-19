"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../controllers/User"));
const router = express_1.default.Router();
router.get('/get', User_1.default.readAll);
router.get('/get/:userid', User_1.default.readUser);
router.post('/create', User_1.default.createUser);
router.put('/update/:userid', User_1.default.updateOrInsertUser);
router.patch('/update/:userid', User_1.default.updateUser);
router.delete('/delete/:id', User_1.default.deleteUser);
exports.default = router;
