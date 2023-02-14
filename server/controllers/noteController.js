import Note from '../models/note.js'
import httpstatuscodes from 'http-status-codes'

// get All the notes of a user after verifying the token
export const getAllNotes = async(req,res)=>{
   
    const {userEmail} = req.body

    try{

        const notes = await Note.find({userEmail});
        
        
        res.status(200).json({
            status : "Success",
            data : {
                notes
            }
        })


        

    }catch(err){
       console.log(err.message);
       res.status(400).json({
        message : err.message
       })
    }

}

// get a specific note with id -->// by searching the title
export const getNoteById = async(req,res)=>{
    
    const {noteId} = req.params;

    try{

        const notes = await Note.find({noteId})

        res.status(200).json({
            status : "Success",
            data : {
                notes
            }
        })

        

    }catch(err){
        console.log(err.message);
        res.status(400).json({
            message : err.message
        })
    }
}



// get all the categories

export const getAllCategories = async(req,res)=>{

    const {userEmail}  =  req.body

    try{

        const notes = await Note.find({userEmail});
        const categories = []
        notes.forEach((note)=>{
            categories.push(note.category)
        })


        //console.log(categories);

        res.status(200).json({
            status : "Success",
            data :  { 
               categories
            }
        })

    }catch(err){
       console.log(err.message);
    }
}

// create a note 


// delete a note