import mongoose from 'mongoose'

const schema=mongoose.Schema({
    url:{
        type:String,
        required:true
    },
    alias:{
        type:String,
        required:true

    }
})

export default mongoose.model('url',schema);