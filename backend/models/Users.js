import { Schema, model } from "mongoose";
import {isEmail} from 'express-validator'

let userSchema = new Schema({
    name: {
        type: "String",
        trim: true,
        required: [true, "Name is required field"],
        minlength:[4, "Name must be atleast 4 characters"]
    },
    email:{
        type: "String",
        required: [true, "Email is required field"],
        trim: true,
        validate:[isEmail, "Email is invalid"],
        unique: true
    },
    password:{
        type: "String",
        required: [true, "Password is required field"],
        trim: true,
        minlength:[8, "Password must be atleast 8 characters"]
    }, 
    confirmPassword:{
        type: "String",
        validator:{
            validate: function(value){
              return this.password = value;
            },
            message:"Password and Confirm Password do not match"
        }
    },
    photo:{
        type: "String",
        default:"data:image/png;base64,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"
        
    }
})

let User = model('User', userSchema)

export default User