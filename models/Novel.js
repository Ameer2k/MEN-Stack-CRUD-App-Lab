const mongoose = require('mongoose')

const novelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 5000
    },
    poplishYear: {
        type: Number,
        required: true,
        min: 0,
        max: 2100
    },
    gere: {
        type: [String],
        default: [],
        validate: {
            validator: function(genres){
                return genres.length <= 20 && genres.every(genre => genre.length <= 100)
            },
            message: 'Use at most 20 genres of up to 100 characters each.'
        }
    },
    image: {
        type: String,
        trim: true,
        validate: {
            validator: function(image){
                if(!image) return true
                try{
                    const url = new URL(image)
                    return url.protocol === 'http:' || url.protocol === 'https:'
                }catch(error){
                    return false
                }
            },
            message: 'Image must be a valid HTTP or HTTPS URL.'
        }
    }
}, { timestamps: true })


const Novel = mongoose.model('Novel', novelSchema)

module.exports = Novel
