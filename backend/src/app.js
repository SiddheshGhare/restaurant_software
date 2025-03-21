import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"



const app = express()
app.use(cors({
    origin: "*",
    credentials: true
}));



app.use(express.json());

app.use(express.urlencoded({ extended: true, limit: "16kb" }))

app.use(express.static("public"))

app.use(cookieParser())



import userRouter from "./routes/user.routes.js"








app.use("/api/v1/user", userRouter)

export { app }