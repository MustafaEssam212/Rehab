import mongoose from 'mongoose';


const Doctor = new mongoose.Schema({
    name: {type: String, required: true},
    cover: {type: String, required: true},
    serial: {type: Number, required: true},
})


export default mongoose.models.Doctor || mongoose.model("Doctor", Doctor)