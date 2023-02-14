import User from "../models/user.js";
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import httpstatuscodes from 'http-status-codes'


//setting up nodemailer
var transporter = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user : 'manas76kulkarni@gmail.com',
        pass : 'eqfx zfyh tojm ajrs'
    }
})





// this is the middleware function
// export const customMiddleware = (req,res,next)=>{
//     console.log("This is the middleware function")

//     next();
// }


export const register = async(req,res)=>{
    const  {name,email,password} = req.body

    try{

        if(!name || !email || !password){
            // res.status(400).json({
            //     status : "Failed",
            //     message : "Please Provide all the credentials",
            //     data : null
            // })

            throw new Error("Please Provide all the credentials");

            //return;
        }


        //check if the new user exists

        const user = await User.findOne({email});

        if(user){
            // res.status(400).json({
            //     status : "Failed",
            //     message : "User with the provided email already exists!",
            //     data : null
            // })


            throw new Error("The user already exists!");
            
            //return;
        }

        
        

        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedpass = await bcrypt.hash(password,salt);

        //create the new user
        const newuser = await User.create({name,email,password :hashedpass});

        //generate the jwt token
        const token = jwt.sign({id:newuser.id,email:newuser.email},'WtLS8SFmMr',{expiresIn : '2h'});


        //send the email
        const mailoptions = {
            from : 'manas76kulkarni@gmail.com',
            to : newuser.email,
            subject : 'Registration to NotesStore',
            text : `Thankyou ${newuser.name} for registering with NotesTask, hope it helps you to increase productivity!`
        }

         transporter.sendMail(mailoptions,(err,info)=>{
            if(err){
                console.log(err.message);
            }
            res.status(201).json({
                status : "Success",
                message : "New user created successfully and mail sent",
                data : {
                    user : newuser,
                    token
                }
            })

         })
        //return the success status
        




        



    }catch(err){
        console.log(err.message);
        res.status(httpstatuscodes.UNAUTHORIZED).json({
            message : err.message
        })
    } 
}

export const login = async(req,res)=>{
   
    const{email,password} = req.body;

    try{

        //check if the email exists and the password is correct

        const finduser = await User.findOne({email});

        if(finduser){
            // now compare the passwords
            const storedpass = finduser.password;

            const passMatch = await bcrypt.compare(password,storedpass);

            if(!passMatch){
                res.status(400).json({
                    status : "Failed",
                    message : "Invalid password provided!",
                    data : null
                })
                return;
            }


            // generate token
            const token = jwt.sign({id:finduser.id,email:finduser.email},'WtLS8SFmMr',{expiresIn:'2h'})

            res.status(200).json({
                status : "Success",
                message : "Login successfull",
                data : {
                    user : {
                        id : finduser.id,
                        name : finduser.name,
                        email : finduser.email
                    },
                    token
                    
                }
            })
        }

        else if(!finduser){
            res.status(400).json({
                status : "Failed",
                message : "Invalid email provided",
                data : null
            
            })

            return;
        }

    }catch(err){
        console.log(err.message)
       res.status(err.status).json({
        status : "Failed",
        message : err.message,
        data : null
       })
    }
    

}