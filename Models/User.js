import mongoose from 'mongoose';


const User = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    password: {type: String, required: true},
    dateOfBirth: {type: String, required: true},
    gender: {type: String, required: true},
    securityQuestion: {type: String, required: true},
    answerSecurityQuestion: {type: String, required: true},
    role: {type: String, default: 'regular'},
    permissions: []

})

export default mongoose.models.User || mongoose.model("User", User)