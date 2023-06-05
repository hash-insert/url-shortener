import { mappingGet } from '../controlers/ULRmapping.js';
import express from 'express';

const Router = express.Router();

Router.get('/',mappingGet);

export default Router;


