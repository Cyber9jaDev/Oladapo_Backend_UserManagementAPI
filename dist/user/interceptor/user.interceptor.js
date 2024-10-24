"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInterceptor = void 0;
const jwt = require("jsonwebtoken");
class UserInterceptor {
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const token = request?.headers?.authorization?.split(" ")[1];
        const user = jwt.decode(token);
        request.user = user;
        return next.handle();
    }
    ;
}
exports.UserInterceptor = UserInterceptor;
//# sourceMappingURL=user.interceptor.js.map