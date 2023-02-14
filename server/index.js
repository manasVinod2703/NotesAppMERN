import express from 'express';
import mongoose from 'mongoose'
import authRouter from './routes/authRouter.js'

const app = express();


const PORT = 3300;

app.use(express.json())
app.use('/api/v1/auth',authRouter)

mongoose.connect('mongodb+srv://Manas2703:ManasKulkarni@cluster0.hjl15d0.mongodb.net/NotesApp?retryWrites=true&w=majority')
.then((con)=>{
    console.log(con.connections);
    console.log("Connection to the database successfull!");
})

app.listen(PORT,()=>{
    console.log(`App is listening on port ${PORT}`);
})