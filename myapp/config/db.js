import mongoose from "mongoose";
import 'dotenv/config'

let CS=process.env.CONNECTION
mongoose.connect(CS)
.then(()=>{
    console.log('connected to mongo')

}).catch((error)=>console.log(error))

export default mongoose.connection