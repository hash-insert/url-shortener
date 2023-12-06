import mongoose from "mongoose";

const URLSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    alias: {
        type: String,
        required: true
    }
});

export default mongoose.model('URLcollection',URLSchema);
