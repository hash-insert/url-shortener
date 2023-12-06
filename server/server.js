import route from './Routes/Route.js';
import routemapping from './Routes/routemapping.js';
import express, { json } from 'express';
import 'dotenv/config.js'
import { connectDB } from './config/database.js';
import URLSchema from './models/model.js';
import ShortURL from './Routes/ShortenRoute.js';
import cors from "cors";

const app = express();

const port = 5000;
app.use(json());
app.use(cors());
app.use('/map',route);
app.use('/mapping',routemapping);
app.use('/shorten',ShortURL);


app.get('/',(req,res)=>{
    res.redirect("https://effervescent-baklava-0dbcf0.netlify.app/");
});

app.get('/i',(req,res)=>{
    let obj=[
        {
            endPoint:'/i/google',
            url: 'https://www.google.com'
         },
         {
            endPoint:'/i/github',
            url: 'https://www.github.com'
         }
    ];
    res.send(obj);
    
})


app.get('/i/google',(req,res)=>{
    res.send('https://www.google.com');
})


app.get('/i/github',(req,res)=>{
    res.send('https://www.github.com');
})

app.get('/r/google',(req,res)=>{
    res.redirect('https://www.google.com');
})

app.get('/r/github',(req,res)=>{
    res.send('https://www.github.com');
})

app.get('/r/:alias',async (req,res)=>{
    const {alias} = req.params
    const URL = await URLSchema.findOne({alias});
    res.redirect(URL.url)
});

const startServer=async()=>{
    try {
       await connectDB(process.env.MONGO)
        console.log(`connected to DB.`)
        app.listen(port, () => {
            console.log(`server listening on ${port}`);
        })
    } catch (error) {
        console.log(`error->${error}`)
    }
}

startServer()