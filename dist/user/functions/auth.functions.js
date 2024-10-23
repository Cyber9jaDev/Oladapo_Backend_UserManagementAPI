"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
const jwt = require("jsonwebtoken");
async function generateToken(user) {
    const payload = { userId: user.id, email: user.email, role: user.role };
    return jwt.sign(payload, process.env.JWT_KEY, { expiresIn: process.env.JWT_LIFETIME });
}
//# sourceMappingURL=auth.functions.js.map