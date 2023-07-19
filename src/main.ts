import express from 'express'
import cors from "cors"
import router from './Router/router.js'
import { config } from 'dotenv';
config()
const app=express()
app.use(cors())
app.use(process.env.ResourcePath,express.static(process.env.Resource))
app.use(express.urlencoded({ extended: false })).use(express.json())
app.use("/System",router)
const port = process.env.BootPort||8082; // Default to 8082 if BootPort environment variable is not set.
app.listen(port,()=>{
  console.log("Express serve Running at 127.0.0.1:"+port);
})