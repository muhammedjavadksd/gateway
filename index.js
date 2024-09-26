
//Imports
const express = require("express");
const app = express();
const dotenv = require("dotenv")
const proxy = require("express-http-proxy")
const cors = require("cors")
const logger = require("morgan");
const { createProxyMiddleware } = require("http-proxy-middleware");

app.use(logger("combined"))

app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://localhost:7001',
    ]
}))
//Config
dotenv.config("./.env");



//const
const PORT = process.env.PORT || 7001
const AUTH_ENDPOINT = process.env.AUTH_ENDPOINT
const PROFILE_ENDPOINT = process.env.PROFILE_ENDPOINT
const FUND_RAISE_EDNPOINT = process.env.FUND_RAISE_EDNPOINT
const BLOOD_ENDPOINT = process.env.BLOOD_ENDPOINT

// app.use(express.json({ limit: "4mb" }))
// app.use(express.urlencoded({ limit: "4mb" }))



console.log("Profile service endpoint", PROFILE_ENDPOINT);

console.log(FUND_RAISE_EDNPOINT);

//middleware
app.use("/api/auth", proxy(AUTH_ENDPOINT))
app.use("/api/profile", proxy(PROFILE_ENDPOINT))
app.use("/api/fund_raise", proxy(FUND_RAISE_EDNPOINT))
app.use("/api/blood", proxy(BLOOD_ENDPOINT))



app.listen(PORT, () => {
    console.log("Gateway started at Port : " + PORT)
})