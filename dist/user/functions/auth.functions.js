"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJWT = generateJWT;
const jwt = require("jsonwebtoken");
async function generateJWT(userId, email) {
    return jwt.sign({ userId, email }, process.env.JWT_KEY, { expiresIn: process.env.JWT_LIFETIME });
}
//# sourceMappingURL=auth.functions.js.map