import URLSchema from '../models/model.js';
import crypto from 'crypto';
// const crypto = require('crypto');

const ShortURL = async (req, res) => {
    const str = req.body.url;
    const hash = crypto.createHash('md5');
    hash.update(str);
    const Shorturl = hash.digest('hex').slice(20);
    const Data = {
        url: str,
        alias: Shorturl
    }
    const findURL = await URLSchema.findOne({ url: str })
    if (findURL) {
        res.send(findURL);
    } else {
        const saved = new URLSchema(Data);
        await saved.save();
        console.log(Data);
        res.send(Data)
    }

}

export default ShortURL;



