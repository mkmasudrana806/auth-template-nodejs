"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notFoundRoute = (req, res) => {
    res.status(404).json({
        success: false,
        message: "API NOT FOUND",
    });
};
exports.default = notFoundRoute;
