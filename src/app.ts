import express from 'express';
import { index } from './routes/index';


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

app.use("/", index)


export default app