import mongoose from 'mongoose';


const Work = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    keywords: [],
    pic: {type: String, default: ''},
    type: {type: String, required: true},
    date: {type: String, required: true},
    gallery: [],
    video: {type: String, default: ''},
    videoThumbnail: {type: String, default: ''}
})

export default mongoose.models.Work || mongoose.model("Work", Work)