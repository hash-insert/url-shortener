import URLSchema from '../models/model.js';


export const mappingGet = async (req,res)=>{
    try{
        const getData =await URLSchema.find();
        res.json(getData);
    }catch(err){
        console.log('error in get/mapping:',err);
    }
}