"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// By default, config will look for a file called .env in the current working directory.
// as this file and .env files are not in the same directory, we need to specify the .env path
const result = dotenv_1.default.config({ path: path_1.default.resolve(process.cwd(), ".env") });
const config = {
    database_url: process.env.PORT,
    default_password: process.env.DEFAULT_PASSWORD,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    node_environment: process.env.NODE_ENVIRONMENT,
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
    jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
};
exports.default = config;
// config will read your .env file, parse the contents, assign it to process.env, and return an Object with a parsed key containing the loaded content or an error key if it failed.
if (result.error) {
    console.log("error while parsing environment variable: ", result.error);
}
