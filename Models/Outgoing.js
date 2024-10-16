import mongoose from 'mongoose';


const Outgoing = new mongoose.Schema({
    name: {type: String, required: true},
    relatedTo: {type: String},
    amount: {type: Number, required: true},
    date: {type: Number, required: true},
    serial: {type: Number, required: true}
})


export default mongoose.models.Outgoing || mongoose.model("Outgoing", Outgoing)