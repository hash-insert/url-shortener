import express from 'express'
import 'dotenv/config'
import db from './config/db.js'
import routerUrl from './router/userUrl.js'
import redirect from './router/redirectUrl.js'
import shortUrl from './router/ShortenUrl.js'
import  cors from 'cors'
import UrlModel from './model/Url_model.js'
const app=express();
app.use(cors())


db.once("open",()=>{
    console.log('connected')
})

app.use(express.json())

app.use(express.urlencoded({extended:true}))

const port=process.env.PORT||3000;
app.use('/map',routerUrl)
app.use('/r',redirect)
app.use('/shorten',shortUrl)
app.get('/mappings',async (req,res)=>{
    const d=await UrlModel.find();
    res.send(d)
})
app.get('/',(req,res)=>{
    res.redirect('https://647a2b13e9ae3838fca12b14--phenomenal-lamington-917755.netlify.app/')
})
app.get('/i/google',(req,res)=>{
    res.send('https://www.google.com')
})
app.get('/i/github',(req,res)=>{
    res.send('https://github.com')
})
app.get('/i',(req,res)=>{
    const obj=[{
       endpoint:'/i/google',
       returns:"https://www.google.com",
      
    },
{
    endpoint:'/i/github',
   returns :"https://github.com"
}]
    res.json(obj)

})
// app.get('/r/google',(req,res)=>{
//     res.redirect('https://www.google.com')
// })
// app.get('/r/github',(req,res)=>{
//     res.redirect('https://www.github.com')
// })

app.listen(port,()=>{
    console.log('server is listening at port 8000')
})