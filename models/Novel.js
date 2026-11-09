const mongoose = require('mongoose')

const novelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    poplishYear: {
        type: Number,
        required: true,
    },
    gere: {
        type: [String],
    },
    image: {
        type: String,
        trim: true,
    },
}, { timestamps: true })


const Novel = mongoose.model('Novel', novelSchema)

module.exports = Novel
