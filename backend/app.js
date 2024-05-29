import express from 'express'
import { urlencoded } from 'express'
import cors from 'cors'
import userRouter from './routes/user.routes.js'
import cookieParser from 'cookie-parser'


const app = express();
app.use(cors({
     origin: "*",
     credentials: true
}));

app.use(express.json({
  limit: '16kb'
}));

app.use(urlencoded({extends:true, limit: '16kb'})); 
app.use(cookieParser());

// const port = 8000


app.use('/api/v1/users', userRouter);

export {app};