const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    questions: {
        type:Array,
        required:true
    },
    lifeLines:{
        type:Object,
        required: true,
        default: {
            fiftyFifty:false,
            askExpert:false,
            phoneAFriend:false,
            flipQuestion:false
        }
    },
    totalWinnings:{
        type:Number,
        required: true,
        default : 0,
    },
    createdFor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
})

const Questions = mongoose.model('question', questionSchema)
module.exports = Questions