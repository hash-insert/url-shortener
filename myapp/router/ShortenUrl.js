import express from 'express';
import { postShorturl } from '../Controller/ControllerShorturl.js';
const router =express.Router();

router.post('/',postShorturl)

export default router