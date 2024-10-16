import mongoose from 'mongoose';


const NonUser = new mongoose.Schema({
    username: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    package: {type: Object, default: {
        name: null,
        sessions: null,
        price: null
    }},
    history: []

})

export default mongoose.models.NonUser || mongoose.model("NonUser", NonUser)