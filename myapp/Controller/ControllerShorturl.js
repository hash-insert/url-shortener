import UrlModel from "../model/Url_model.js";
import crypto from 'crypto'

export const postShorturl=async (req,res)=>{
    let url=req.body.url;
    const hash=crypto.createHash('sha256');
    hash.update(url);
    const short=hash.digest('hex')
   const data=short[2]+short[5]+short.slice(short.length-6,short.length-2)
   const doc={
    url, 
    alias:data
   }
   const search= await UrlModel.findOne({url:url})
   if(search){
    res.send(search.alias)

   }else{
    const saved=UrlModel(doc);
    const result= await saved.save();
    res.send(data);
 

   }
   
  
  

}