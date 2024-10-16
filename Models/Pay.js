import mongoose from 'mongoose';


const Pay = new mongoose.Schema({
    name: {type: String, required: true},
    relatedTo: {type: String},
    amount: {type: Number, required: true},
    date: {type: Number, required: true},
    serial: {type: Number, required: true}
})


export default mongoose.models.Pay || mongoose.model("Pay", Pay)