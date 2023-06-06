import urlModel from '../model/Url_model.js'


export const postData=async (req,res)=>{
    console.log('inpostdata')
    const newdata= urlModel(req.body)
    console.log(newdata)

    try{
        const search=await urlModel.findOne({url:req.body.url})
        if(search){
            res.send(search)
            console.log(search)

        }else{
            const saved=await newdata.save();
            res.json(saved)
            console.log(saved)
    

        }
       
    }catch(error){
        res.send(error);

    }
    
}

export const getData=async(req,res)=>{
    try{
        const data=await urlModel.find();
        res.status(200).json(data)

    }catch(error){


    }
}