import mongoose from 'mongoose'


const noteSchema = new mongoose.Schema({

    title : {
        type : String,
        required : [true, "Please Enter a title to the note!"]
    },

    description : {
        type : String
    },

    category : {
        type : String,
        required : [true, "Please Enter the category for the note!"]
    },

    userEmail : {
        type : String,
        required : [true,"Please Enter the email of the user!"]
    },

    createdAt : {
        type : String
    }
})


const noteModel = mongoose.model("Note",noteSchema);

export default noteModel