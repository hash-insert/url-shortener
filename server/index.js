const express = require('express');
const app = express();
const mongoose = require('mongoose');
const shortid = require('shortid');
const crypto = require('crypto');

const {connectToDatabase, getDatabase} = require('./db');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect('mongodb+srv://greesh_5:munny123@cluster0.lvfzzc5.mongodb.net/URL', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB Atlas');

    const mappingSchema = new mongoose.Schema({alias: String, url: String});

    const Mapping = mongoose.model('Mapping', mappingSchema);

    app.post('/map', async (req, res) => {
        const {alias, url} = req.body;
        try {
            const newMapping = new Mapping({alias, url});
            await newMapping.save();
            res.status(201).json({message: 'Mapping saved successfully'});
        } catch (error) {
            console.error('Error saving mapping:', error);
            res.status(500).json({error: 'Internal server error'});
        }
    });
    app.get('/', (req, res) => {
        return res.send("welcome");
    })

    app.get('/i', (req, res) => {
        const endpoints = [
            {
                path: '/i/google',
                description: 'Google website'
            }, {
                path: '/i/github',
                description: 'GitHub website'
            }
        ];
        const response = endpoints.map(endpoint => `<li>${
            endpoint.path
        }: ${
            endpoint.description
        }</li>`).join('');

        res.send(`<ul>${response}</ul>`);
    });

    app.get('/i/github', (req, res) => {
        res.send('<a href="https://github.com">GitHub</a>');
    });

    app.get('/i/google', (req, res) => {
        res.send('<a href="https://www.google.com">Google</a>')
    })

    app.get('/r/google', (req, res) => {
        res.redirect('https://google.com');
    })

    app.get('/r/github', (req, res) => {
        res.redirect('https://github.com');
    })

    app.get('/r', (req, res) => {
        const msg = `<b>To redirect the website for Google and Github use the endpoints as: <br><br> <li>/r/google to visit the google website</li> <br> <li>/r/github to visit the github website</li>`;
        res.send(msg);
    })

    const mappings = {};

    app.post('/map', async (req, res) => {
        const {alias, url} = req.body;
        const db = getDatabase();
        connectToDatabase();
        const collection = db.collection('URL');
        try {
            await collection.insertOne({alias, url});
            res.status(201).json({message: 'Mapping saved successfully'});
        } catch (error) {
            console.error('Error saving mapping:', error);
            res.status(500).json({error: 'Internal server error'});
        }
    });

    app.get('/mappings', async (req, res) => {
        try {
            const mappings = await Mapping.find();
            res.json(mappings);
        } catch (error) {
            console.error('Error retrieving mappings:', error);
            res.status(500).json({error: 'Internal server error'});
        }
    });
    app.get('/r/:alias', (req, res) => {
        const {alias} = req.params;

        if (mappings.hasOwnProperty(alias)) {
            const url = mappings[alias];
            res.redirect(url);
        } else {
            res.sendStatus(404);
        }
    });

    app.get('/:alias', async (req, res) => {
        const alias = req.params.alias;
        try {
            const mapping = await Mapping.findOne({alias});
            if (mapping) {
                const {url} = mapping;
                res.redirect(url);
            } else {
                res.status(404).json({error: 'Alias not found'});
            }
        } catch (error) {
            console.error('Error retrieving URL:', error);
            res.status(500).json({error: 'Internal server error'});
        }
    });
    
    app.post('/api/shorten', async (req, res) => {
        const { url } = req.body;
        
        // Check if the URL already exists in the database
        const existingMapping = await Mapping.findOne({ url });
        if (existingMapping) {
          res.json({ shortenedUrl: `https://url2-xngs.onrender.com/${existingMapping.alias}` });
          return;
        }
        else{
        let randomKey = shortid.generate();
        const shortenedUrl = `https://url2-xngs.onrender.com/${randomKey}`;
        
        const short_url = {
          alias: randomKey,
          url: url
        }
        
        // You can handle storing the shortened URL in a database here
        const shortUrl = new Mapping(short_url);
        await shortUrl.save();
        
        res.json({ shortenedUrl });}
      });

 
    app.listen(5000, () => {
        console.log("welcome on port 5000");
    });
}).catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
});

