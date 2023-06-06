import express from 'express';
import { redirectData } from '../Controller/ControllerRedirect.js';




const router=express.Router();
router.get('/:alias',redirectData)

router.get('/google',(req,res)=>{
    res.redirect('https://www.google.com')
})
router.get('/github',(req,res)=>{
    res.redirect('https://www.github.com')
})

export  default router