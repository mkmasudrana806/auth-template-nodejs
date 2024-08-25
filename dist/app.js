"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./app/routes");
const app = (0, express_1.default)();
// parsers (middleware)
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: "http://localhost:5000" }));
// api routes (middleware)
app.use("/api", routes_1.ApiRoutes);
// base api route
app.get("/", (req, res) => {
    res.send("Server is running...");
});
// not found route
app.use("*", (req, res) => {
    res.status(404).send("Route not found!");
});
// global error handler
app.use((err, req, res, next) => {
    res.status(500).json(err);
});
exports.default = app;
