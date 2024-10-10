import mongoose from 'mongoose';


const Prices = new mongoose.Schema({
    sessionPrice: {type: Number, default: 350},
    examinationPrice: {type: Number, default: 500},
    packages: []
})


export default mongoose.models.Prices || mongoose.model("Prices", Prices)