import express from 'express'
import cors from "cors"
import AdminApi from './Router/AdminApi.js'
import OpenAPI from './Router/OpenAPI.js'
import UseAPI from './Router/UseAPI.js'
import * as middleware from './ToolClass/middleware.js'
import { config } from 'dotenv';
config()
const app=express()
app.use(cors())
app.use(process.env.ResourcePath,express.static(process.env.Resource))
app.use(express.urlencoded({ extended: false })).use(express.json())
app.use("/admin",middleware.verifyToken,middleware.verifyRole,AdminApi)
app.use("/user",middleware.verifyToken,UseAPI)
app.use("/open",OpenAPI)
const port = process.env.BootPort||8082; // Default to 8082 if BootPort environment variable is not set.
app.listen(port,()=>{
  console.log("Express serve Running at http:localhost:"+port);
})