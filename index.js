import {app} from './app.js';
import connectDB from './db/index.js';
import dotenv from 'dotenv';

const PORT = process.env.PORT || 8000;

dotenv.config({
     path: './.env'
})



// console.log(process.env.MONGODB_URI)

connectDB()
.then(() => {
     console.log('DB connecting...');
     app.on('error', (error) => { 
          console.log(`Error occurred: ${error}`)
          throw error
     })

     app.listen(PORT, ()=>{
          console.log(`App is listening on port: 8000`);
     })
})
.catch((error) => {
     console.log('Error: ', error);
})
