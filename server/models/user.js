import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({

    name : {
        type : "String",
        required : [true,"Please Provide the user name!"]
    },

    email : {
        type : "String",
        required : [true,"Please provide a valid email!"]
    },

    password : {
        type : "String",
        required : [true,"Please provide a valid password!"]
    }
})

const model = mongoose.model('User',userSchema);

export default model;