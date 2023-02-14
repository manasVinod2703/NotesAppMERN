import express from 'express';
import mongoose from 'mongoose'
import authRouter from './routes/authRouter.js'
import noteRouter from './routes/noteRouter.js'
import cors from 'cors'


const app = express();


const PORT = 3300;

app.use(cors());
app.use(express.json())
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/notes',noteRouter)
app.post('/',(req,res)=>{
    res.status(200).json({
        message : req.body
    })
})

mongoose.connect('mongodb+srv://Manas2703:ManasKulkarni@cluster0.hjl15d0.mongodb.net/NotesApp?retryWrites=true&w=majority')
.then((con)=>{
    console.log(con.connections);
    console.log("Connection to the database successfull!");
})

app.listen(PORT,()=>{
    console.log(`App is listening on port ${PORT}`);
})