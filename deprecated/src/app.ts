import express from 'express';
import { index } from './routes/index';


const app = express()

app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

app.use("/", index)


export default app