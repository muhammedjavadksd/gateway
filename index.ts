import express from 'express'
import dotenv from 'dotenv';
import proxy from 'express-http-proxy';
import cors from 'cors';
import logger from 'morgan'

const app = express();
app.use(logger("combined"))

app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://localhost:7001',
    ]
}))

dotenv.config({ path: "./.env" })

const PORT: number = +(process.env.PORT || 7001)
const AUTH_ENDPOINT: string = process.env.AUTH_ENDPOINT || ""
const PROFILE_ENDPOINT: string = process.env.PROFILE_ENDPOINT || ""
const FUND_RAISE_EDNPOINT: string = process.env.FUND_RAISE_EDNPOINT || ""
const BLOOD_ENDPOINT: string = process.env.BLOOD_ENDPOINT || ""

app.use("/api/auth", proxy(AUTH_ENDPOINT))
app.use("/api/profile", proxy(PROFILE_ENDPOINT))
app.use("/api/fund_raise", proxy(FUND_RAISE_EDNPOINT))
app.use("/api/blood", proxy(BLOOD_ENDPOINT))

app.listen(PORT, () => {
    console.log("Gateway started at Port : " + PORT)
})