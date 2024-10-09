"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_http_proxy_1 = __importDefault(require("express-http-proxy"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("combined"));
app.use((0, cors_1.default)({
    origin: [
        'http://localhost:3000',
        'http://localhost:7001',
    ]
}));
dotenv_1.default.config({ path: "./.env" });
const PORT = +(process.env.PORT || 7001);
const AUTH_ENDPOINT = process.env.AUTH_ENDPOINT || "";
const PROFILE_ENDPOINT = process.env.PROFILE_ENDPOINT || "";
const FUND_RAISE_EDNPOINT = process.env.FUND_RAISE_EDNPOINT || "";
const BLOOD_ENDPOINT = process.env.BLOOD_ENDPOINT || "";
app.use("/api/auth", (0, express_http_proxy_1.default)(AUTH_ENDPOINT));
app.use("/api/profile", (0, express_http_proxy_1.default)(PROFILE_ENDPOINT));
app.use("/api/fund_raise", (0, express_http_proxy_1.default)(FUND_RAISE_EDNPOINT));
app.use("/api/blood", (0, express_http_proxy_1.default)(BLOOD_ENDPOINT));
app.listen(PORT, () => {
    console.log("Gateway started at Port : " + PORT);
});
