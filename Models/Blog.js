import mongoose from 'mongoose';


const Blog = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    keywords: [],
    cover: {type: String, required: true},
    html: {type: String, required: true},
    date: {type: String, required: true},
    serial: {type: Number, required: true}
})

export default mongoose.models.Blog || mongoose.model("Blog", Blog)