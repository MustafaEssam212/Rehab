import mongoose from 'mongoose';


const Schedule = new mongoose.Schema({
    date: {type: String, required: true},
    doctors: []
})



export default mongoose.models.Schedule || mongoose.model("Schedule", Schedule)