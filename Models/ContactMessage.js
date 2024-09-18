import mongoose from 'mongoose';


const ContactMessage = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    subject: {type: String, required: true},
    message: {type: String, required: true},
    date: {type: String, required: true}
})


export default mongoose.models.ContactMessage || mongoose.model("ContactMessage", ContactMessage)