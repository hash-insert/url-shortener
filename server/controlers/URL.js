
import URLSchema from '../models/model.js';

export const mapPost = async (req,res)=>{
    const postData = new URLSchema(req.body);
    try{
        await postData.save();
        res.json(postData);
    }catch(err){
        console.log('error in post/map:',err)
    }
}


