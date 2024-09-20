import express from 'express'
import { urlencoded } from 'express'
import cors from 'cors'
import userRouter from './routes/user.routes.js'
import cookieParser from 'cookie-parser'
import { Server } from 'socket.io'
import http from 'http'




const app = express();
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  next();
  
})

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  
  }

})

app.use(cors({
  origin: "*",
  credentials: true
}));


io.on('connection', (socket) => {
  // console.log('a user connected ' + socket.id);
  // socket.on('disconnect', () => {
  //   console.log('user disconnected');
  // });

  socket.on("join_room", (data,room) => {
    socket.join(room);
    socket.to(room).emit("join_room_data", data);
    console.log(data + " joined " + room);
  }
  )

  socket.on("send_message", (data) => {
    console.log(data);
    socket.to(data.room).emit("receive_message", data);

  })

  socket.on("leave_room", (data, room) => {
    socket.to(room).emit("leave_room", data);
    console.log(data + " left " + room);
    socket.leave(room);
  })
})
server.listen(process.env.PORT || 3001, () => {
  console.log('listening on *:8000');
})



app.use(express.json({
  limit: '16kb'
}));

app.use(urlencoded({extends:true, limit: '16kb'})); 
app.use(cookieParser());

// const port = 8000


app.use('/api/v1/users', userRouter);

export {app};