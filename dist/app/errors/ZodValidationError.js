"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// handle zod validation 
const zodValidationError = (err) => {
    let statusCode = 401;
    let errorSources = err.issues.map((issue) => ({
        path: issue.path[issue.path.length - 1],
        message: issue.message,
    }));
    return {
        statusCode,
        message: "Zod validation error",
        errorSources,
    };
};
exports.default = zodValidationError;
