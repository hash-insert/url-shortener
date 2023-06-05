import express from 'express';
import  ShortURL  from '../controlers/ShortenURL.js';

const Router = express.Router();

Router.post('/',ShortURL);

export default Router;