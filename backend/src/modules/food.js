import mongoose from "mongoose";


const foodSchema = new mongoose.Schema({
    food: { type: Object, required: true },
    
}, {
    timestamps: true,
});

const Food = mongoose.model('Food', foodSchema);

export default Food;