import urlModel from "../model/Url_model.js";

export const redirectData = async (req, res) => {
    
        try {
            const {alias} =  req.params;
            if(alias){
                const result = await urlModel.findOne({ alias })
                console.log(req.params)
                console.log(result)
                res.redirect(result.url);

            }else{
                res.send('no alias exists')
            }
           
           
    
        } catch (error) {
        res.send(error);
    }

    
       
}