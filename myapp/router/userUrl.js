import express from 'express'
import { postData,getData } from '../Controller/ControllerUrl.js';


const router=express.Router();

router.post('/',postData)






export default router