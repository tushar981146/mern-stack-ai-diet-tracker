import mongoose from 'mongoose';

const listSchema = new mongoose.Schema({
    protien: { type: Number, required: true },
    carbs: { type: Number, required: true },
    fats: { type: Number, required: true},
    calories: { type: Number, required: true },
    fiber: { type: Number, required: true },
    },
    {
        timestamps: true,
    } 
);

const list = mongoose.model('List', listSchema);

export default list;