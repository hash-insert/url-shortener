import express from 'express';
import {mapPost} from '../controlers/URL.js'

const Router = express.Router();

Router.post('/',mapPost);

export default Router;



